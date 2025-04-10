import { defineStore } from 'pinia'
import api from '/lib/axios'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
  }),
  actions: {
    async addTransaction(data) {
      const res = await api.post('/transactions', data)
      this.transactions.push(res.data)
    },
  },
})
