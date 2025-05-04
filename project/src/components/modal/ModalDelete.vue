<template>
  <div
    class="modal fade"
    id="unregisterModal"
    tabindex="-1"
    aria-labelledby="unregisterModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <p class="fw-bold text-dark">정말 탈퇴하시겠습니까?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">취소</button>
          <button
            type="button"
            class="member-out btn btn-danger"
            @click="confirmDelete"
            data-bs-dismiss="modal"
          >
            네, 탈퇴할래요
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const confirmDelete = async () => {
  const userId = localStorage.getItem('userId')
  // if (!userId) return alert('로그인 정보가 없습니다.')

  try {
    await axios.delete(`http://localhost:3000/users/${userId}`)
    localStorage.removeItem('userId')
    alert('탈퇴가 완료되었습니다.')
    router.push('/login')
  } catch (err) {
    console.error(err)
    alert('탈퇴 중 오류가 발생했습니다.')
  }
}
</script>
