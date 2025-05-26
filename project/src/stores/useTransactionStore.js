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
    userId:null,
  }),

  actions: {
    async fetchLoggedInUser() {
      try {
        const res = await axios.get('http://localhost:3000/loggedInUser')
        this.userId = res.data.userId
        console.log('✅ 로그인된 userId:', this.userId)
      } catch (error) {
        console.error('로그인 유저 정보 불러오기 실패:', error)
      }
    },

    async fetchTransactions(queryParams ={}) {  //filters 객체는 필터링 조건들이 담긴 { isIncome, category, date_gte, date_lte, ... } 형태
      this.isLoading = true
      try {
        if (!this.userId) {
          await this.fetchLoggedInUser()
        }
        //queryParams에 빈 값 제거
        const cleanQueryParams = Object.fromEntries(
          Object.entries(queryParams).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
        )

        // 👉 URLSearchParams로 수동 처리 (중복 key 허용)
        const params = new URLSearchParams()

        for (const key in cleanQueryParams) {
          const value = cleanQueryParams[key]
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v)) // ex. category=foodcost&category=shopping
          } else {
            params.append(key, value)
          }
        }
         params.append('userId', this.userId) //userId도 쿼리에 추가

        const res = await axios.get(`http://localhost:3000/transactions?${params.toString()}`)
        console.log('📦 필터링 결과:', res.data)
        console.log("\n\n\n\n------------------- item ----------------\n");
        // 이거 정렬하기
        this.transactions = res.data.map(convertTransaction)
        console.log(this.transactions[0]);
        this.transactions.sort((a, b) => b.date - a.date)
        console.log(this.transactions[0]);
        console.log("\n\n\n\n");
      } catch (error) {
        console.error('거래 데이터 불러오기 실패:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
})