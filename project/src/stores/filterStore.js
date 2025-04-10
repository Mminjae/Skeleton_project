//transactionStore는 데이터 전용, 
//filterStore는 상태 전용으로 나눠 분할 관리한다.

import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    year: null,
    month: null,
    isIncome: null,
    category: null,
    paymentMethod: null,
  }),

  actions: {
    setFilter(key, value) {
      this[key] = value
    },
    resetFilters() {
      this.year = null
      this.month = null
      this.isIncome = null
      this.category = null
      this.paymentMethod = null
    }
  }
})