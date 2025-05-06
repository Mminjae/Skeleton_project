import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const memberInfo = ref([])
  const contactInfo = ref([])

  const formatPhone = (number) => {
    if (!number) return ''
    return number.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
  }

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`)
      user.value = response.data

      memberInfo.value = [
        { label: '이름', value: user.value.name },
        { label: '생년월일', value: user.value.brith },
        { label: 'ID', value: String(user.value.userId) },
      ]

      contactInfo.value = [
        { label: '이메일', value: user.value.email },
        { label: '전화번호', value: formatPhone(user.value.phone) },
      ]
    } catch (error) {
      console.error('유저 정보 로딩 실패:', error)
    }
  }
  return { user, memberInfo, contactInfo, fetchUser }
})
