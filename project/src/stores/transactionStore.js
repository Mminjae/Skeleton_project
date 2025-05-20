//  Pinia 트랜잭션 스토어 정의
import { defineStore } from 'pinia'
import api from '/lib/axios'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [], //  전체 거래 목록 저장
  }),

  actions: {
    /**
     * - 새로운 거래 데이터를 추가하는 메서드
     * - 변환 후 서버에 POST 요청
     * - 로컬 상태에도 push
     */
    async addTransaction(data) {
      const converted = this.convertTransaction(data)
      await api.post('/transactions', converted)
      this.transactions.push(converted) // 서버 응답 대신 변환된 데이터 push
    },

    /**
     * - 날짜 정보 등을 정규화하여 거래 객체로 변환
     * - date 또는 dateYear/month/day 기반 생성
     * - 기본 값 fallback 있음
     * - id는 기존 배열에서 최대값 + 500 (로컬 고유 처리)
     */
    convertTransaction(item) {
      let date

      // 날짜 처리: date가 있으면 그대로, 없으면 구성 요소로 생성
      if (item.date) {
        date = new Date(item.date)
      } else if (item.dateYear && item.dateMonth && item.dateDay) {
        date = new Date(item.dateYear, item.dateMonth - 1, item.dateDay)
      } else {
        date = new Date() // fallback 현재 날짜
      }

      // ID는 현재 트랜잭션 최대값 + 500으로 부여
      const lastId = this.transactions.length
        ? Math.max(...this.transactions.map((t) => Number(t.id)))
        : 0

      const formattedDate = date.toISOString().split('T')[0] // YYYY-MM-DD 형식

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

    /**
     * 요일을 한글로 반환하는 유틸 함수 (일~토)
     */
    getDayOfWeek(dateObj) {
      const days = ['일', '월', '화', '수', '목', '금', '토']
      return days[dateObj.getDay()]
    },
  },
})
