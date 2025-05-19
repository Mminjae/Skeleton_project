import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const _isLoggedIn = ref(false)

  // 외부에서는 computed로만 접근하게 하여 직접 수정 방지
  const isLoggedIn = computed(() => _isLoggedIn.value)

  function login() {
    _isLoggedIn.value = true
  }

  function logout() {
    _isLoggedIn.value = false
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
})
