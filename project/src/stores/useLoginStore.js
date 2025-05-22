// project/src/stores/useLoginStore.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useLoginStore = defineStore('login', () => {
  const _isLoggedIn = ref(false)
  const isLoggedIn = computed(() => _isLoggedIn.value)
  const user = ref(null)

  const init = () => {
    const isStored = localStorage.getItem('isLoggedIn') === 'true'
    _isLoggedIn.value = isStored
  }

  function login() {
    _isLoggedIn.value = true
    localStorage.setItem('isLoggedIn', 'true')
  }

  function logout() {
    _isLoggedIn.value = false
    localStorage.setItem('isLoggedIn', 'false')
  }

  const fetchLoggedInUser = async () => {
    const userId = localStorage.getItem('loggedInUser')
    if (!userId) return

    const res = await axios.get(`http://localhost:3000/users/${userId}`)
    user.value = res.data
  }

  const updateUser = (newData) => {
    user.value = { ...user.value, ...newData }
  }

  return {
    _isLoggedIn,
    login,
    logout,
    isLoggedIn,
    user,
    fetchLoggedInUser,
    updateUser,
    init,
  }
})
