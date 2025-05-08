//axios 연결까지 한 버전
// src/stores/useTransactionStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

//date_gte와 date_lte를 date필드로 변환해 주는 변환함수 convertTransaction정의
function convertTransaction(item) {
  let date

  if (item.date) {
    date = new Date(item.date)
  } else if (item.dateYear && item.dateMonth && item.dateDay) {
    date = new Date(item.dateYear, item.dateMonth - 1, item.dateDay)
  } else {
    date = new Date()
  }

  // "YYYY-MM-DD" 포맷 추가
  const dateString = date.toISOString().slice(0, 10)

  return {
    ...item,
    date,
    dateString
  }
}


export const useTransactionStore = defineStore('useTransactionStore', {
  state: () => ({
    transactions: [], // 필터링된 거래 목록
    isLoading: false,
  }),

  actions: {
    async fetchTransactions(queryParams) {  //filters 객체는 필터링 조건들이 담긴 { isIncome, category, date_gte, date_lte, ... } 형태
      this.isLoading = true
      try {
        const res = await axios.get('http://localhost:3000/transactions', {
          params: queryParams     //여기서 쿼리를 전송해줌, GET방식임 주의!!
        })
        console.log('📦 필터링 결과:', res.data)
        this.transactions = res.data.map(convertTransaction)
      } catch (error) {
        console.error('거래 데이터 불러오기 실패:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
})