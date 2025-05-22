<template>
  <div class="btn-group">
    <button class="save btn btn-light" @click="handleSave">저장</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/useLoginStore'

const memberInfo = inject('memberInfo')
const contactInfo = inject('contactInfo')
const errors = inject('errors')
const validateItem = inject('validateItem')
const imagePreview = inject('imagePreview')

const router = useRouter()
const loginStore = useLoginStore()

const handleSave = async () => {
  ;[...memberInfo.value, ...contactInfo.value].forEach(validateItem)
  const isValid = Object.values(errors.value).every((msg) => !msg)
  const userId = localStorage.getItem('loggedInUser')
  if (!isValid) {
    alert('입력값을 확인해주세요.')
    return
  }

  const payload = {
    name: memberInfo.value.find((i) => i.label === '이름')?.value,
    birth: memberInfo.value.find((i) => i.label === '생년월일')?.value,
    userId: memberInfo.value.find((i) => i.label === 'ID')?.value,
    email: contactInfo.value.find((i) => i.label === '이메일')?.value,
    phone: contactInfo.value.find((i) => i.label === '전화번호')?.value,
    profileImage: imagePreview.value || '', // 이미지 포함!
  }

  try {
    await axios.patch(`http://localhost:3000/users/${userId}`, payload)
    alert('저장되었습니다.')
    loginStore.updateUser({
      name: payload.name,
      profileImage: payload.profileImage,
    })
    router.push('/mypage')
  } catch (e) {
    console.error('저장 실패:', e)
    alert('저장에 실패했습니다.')
  }
}
</script>

<style scoped>
.save {
  width: 5rem;
}
</style>
