import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoginStore = defineStore('login', () => {
  // ✅ 로컬스토리지에서 초기 상태 설정
  const _isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')

  const isLoggedIn = computed(() => _isLoggedIn.value)

  function login() {
    _isLoggedIn.value = true
    localStorage.setItem('isLoggedIn', 'true') // ✅ 저장
  }

  function logout() {
    _isLoggedIn.value = false
    localStorage.removeItem('isLoggedIn') // ✅ 제거
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
})
