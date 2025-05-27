import { defineStore } from 'pinia'
import api from '/lib/axios'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [], // 전체 거래 목록
    userId: null, // 로그인된 사용자 ID
  }),

  actions: {
    /**
     * 로그인된 사용자 정보 로드
     */
    async fetchLoggedInUser() {
      try {
        const res = await api.get('/loggedInUser')
        this.userId = res.data.userId
        console.log('✅ 로그인된 userId:', this.userId)
      } catch (error) {
        console.error('로그인 유저 정보 불러오기 실패:', error)
      }
    },

    /**
     * 트랜잭션 전체 또는 필터링된 목록 불러오기
     */
    async fetchTransactions(queryParams = {}) {
      if (!this.userId) await this.fetchLoggedInUser()

      const cleanQueryParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== '' && v !== null && v !== undefined),
      )

      const params = new URLSearchParams()
      for (const key in cleanQueryParams) {
        const value = cleanQueryParams[key]
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v))
        } else {
          params.append(key, value)
        }
      }
      params.append('userId', this.userId)

      try {
        const res = await api.get(`/transactions?${params.toString()}`)
        this.transactions = res.data.map(this.convertTransaction)
        this.transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
      } catch (error) {
        console.error('📦 거래 목록 불러오기 실패:', error)
      }
    },

    /**
     * 트랜잭션 추가
     */
    async addTransaction(data) {
      if (!this.userId) await this.fetchLoggedInUser()

      const converted = this.convertTransaction({ ...data, userId: this.userId })
      await api.post('/transactions', converted)
      this.transactions.push(converted)
    },

    /**
     * 트랜잭션 수정
     */
    async updateTransaction(updatedItem) {
      if (!this.userId) await this.fetchLoggedInUser()

      try {
        const updated = { ...updatedItem, userId: this.userId }
        await api.put(`/transactions/${updated.id}`, updated)
        await this.fetchTransactions()
      } catch (err) {
        console.error('🔄 거래 수정 실패:', err)
      }
    },

    /**
     * 트랜잭션 삭제
     */
    async deleteTransaction(id) {
      try {
        await api.delete(`/transactions/${id}`)
        await this.fetchTransactions()
      } catch (err) {
        console.error('🗑️ 거래 삭제 실패:', err)
      }
    },

    /**
     * 트랜잭션 객체로 변환
     */
    convertTransaction(item) {
      let date

      if (item.date) {
        date = new Date(item.date)
      } else if (item.dateYear && item.dateMonth && item.dateDay) {
        date = new Date(item.dateYear, item.dateMonth - 1, item.dateDay)
      } else {
        date = new Date()
      }

      // 날짜 유효성 fallback 처리
      if (isNaN(date.getTime())) {
        date = new Date()
      }

      const formattedDate = date.toISOString().split('T')[0]

      // ✅ ID 중복 방지를 위해 Date.now() 사용
      const id = item.id ? String(item.id) : String(Date.now())

      return {
        id,
        amount: Number(item.amount),
        category: item.category,
        merchant: item.title || item.merchant || '',
        memo: item.memo || '',
        userId: item.userId,
        dateYear: date.getFullYear(),
        dateMonth: date.getMonth() + 1,
        dateDay: date.getDate(),
        dayOfWeek: this.getDayOfWeek(date),
        isIncome: item.hasOwnProperty('isIncome') ? item.isIncome : false,
        paymentMethod: item.paymentMethod || '',
        date: formattedDate,
      }
    },

    /**
     * 요일을 한글로 반환
     */
    getDayOfWeek(dateObj) {
      const days = ['일', '월', '화', '수', '목', '금', '토']
      return days[dateObj.getDay()]
    },
  },
})
