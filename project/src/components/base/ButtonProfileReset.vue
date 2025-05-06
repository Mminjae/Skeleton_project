<template>
  <button class="profile-reset btn btn-light" @click="resetProfileImage">초기화</button>
</template>

<script setup>
import { inject } from 'vue'
import axios from 'axios'
import defaultProfile from '@/assets/imgs/user.png'

const imagePreview = inject('imagePreview')

const resetProfileImage = async () => {
  imagePreview.value = defaultProfile
  try {
    await axios.patch(`http://localhost:3000/users/1`, {
      profileImage: defaultProfile,
    })
    alert('기본 이미지로 초기화되었습니다.')
  } catch (error) {
    console.error('기본 이미지 저장 실패:', error)
    alert('초기화 실패')
  }
}
</script>
