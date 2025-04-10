//axios 연결까지 한 버전
// src/stores/useTransactionStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [], // 필터링된 거래 목록
    isLoading: false,
  }),

  actions: {
    async fetchFilteredTransactions(filters) {  //filters 객체는 필터링 조건들이 담긴 { isIncome, category, date_gte, date_lte, ... } 형태
      this.isLoading = true
      try {
        const { data } = await axios.get('http://localhost:3000/transactions', {
          params: filters     //여기서 쿼리를 전송해줌, GET방식임 주의!!
        })
        this.transactions = data
      } catch (error) {
        console.error('거래 데이터 불러오기 실패:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
})