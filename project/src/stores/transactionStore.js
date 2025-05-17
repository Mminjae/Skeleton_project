import { defineStore } from 'pinia'
import api from '/lib/axios'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
  }),

  actions: {
    async addTransaction(data) {
      const converted = this.convertTransaction(data)
      const res = await api.post('/transactions', converted)
      this.transactions.push(res.data)
    },

    convertTransaction(item) {
      let date

      // date 문자열이 있으면 우선 사용
      if (item.date) {
        date = new Date(item.date)
      }
      // 연, 월, 일 분해된 값이 있으면 새로 생성
      else if (item.dateYear && item.dateMonth && item.dateDay) {
        date = new Date(item.dateYear, item.dateMonth - 1, item.dateDay)
      }
      // fallback: 현재 날짜
      else {
        date = new Date()
      }

      const lastId = this.transactions.length
        ? Math.max(...this.transactions.map((t) => Number(t.id)))
        : 0

      const formattedDate = date.toISOString().split('T')[0]

      return {
        id: String(lastId + 500),
        amount: item.amount,
        category: item.category,
        merchant: item.title || item.merchant || '',
        memo: item.memo || '',
        userId: item.userId || 1,
        dateYear: date.getFullYear(),
        dateMonth: date.getMonth() + 1,
        dateDay: date.getDate(),
        dayOfWeek: this.getDayOfWeek(date),
        isIncome: item.type === 'income' || item.isIncome === true,
        paymentMethod: item.paymentMethod || '',
        date: formattedDate,
      }
    },

    getDayOfWeek(dateObj) {
      const days = ['일', '월', '화', '수', '목', '금', '토']
      return days[dateObj.getDay()]
    },
  },
})
