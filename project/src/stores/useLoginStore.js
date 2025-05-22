import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useLoginStore = defineStore('login', () => {
  // const _isLoggedIn = ref(false)

  // 외부에서는 computed로만 접근하게 하여 직접 수정 방지
  const isLoggedIn = computed(() => _isLoggedIn.value)
  const user = ref(null)

  // function login() {
  //   _isLoggedIn.value = true
  // }

  // function logout() {
  //   _isLoggedIn.value = false
  // }
  const _isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')

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
  // const logout = () => {
  //   user.value = null
  //   localStorage.removeItem('loggedInUser')
  // }

  return {
    isLoggedIn,
    login,
    logout,
    user,
    fetchLoggedInUser,
    updateUser,
  }
})
