<template>
  <div class="modal-bg" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- 헤더 -->
        <div class="modal-header">
          <button class="btn btn-outline-dark" type="button" @click="$emit('close')">
            <img src="file:///C:/Users/pc/Downloads/%EC%82%AD%EC%A0%9C.svg" alt="닫기" />
          </button>
        </div>

        <!-- 본문 -->
        <div class="modal-body modal-body--center">
          <p class="result-message">새 비밀번호를 입력해주세요.</p>
          <input
            v-model="newPassword"
            type="password"
            class="modal-input"
            placeholder="새 비밀번호"
          />
          <input
            v-model="confirmPassword"
            type="password"
            class="modal-input"
            placeholder="비밀번호 확인"
          />
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>

        <!-- 재설정 버튼 -->
        <div class="modal-footer">
          <button class="btn btn-primary--id" @click="resetPassword">재설정</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close', 'reset'])

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const resetPassword = () => {
  if (!newPassword.value || !confirmPassword.value) {
    errorMessage.value = '모든 칸을 입력해주세요.'
    shakeModal()
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.'
    shakeModal()
    return
  }
  if (!isValidPassword(newPassword.value)) {
    errorMessage.value =
      '비밀번호는 10자 이상이며, 대소문자/숫자/특수문자 중 2가지 이상을 포함해야 합니다.'
    shakeModal()
    return
  }

  errorMessage.value = ''
  emit('reset', newPassword.value)
  emit('close')
}
//비밀번호 유효성 검사
const isValidPassword = (pw) => {
  if (pw.length < 10) return false

  const hasUpper = /[A-Z]/.test(pw)
  const hasLower = /[a-z]/.test(pw)
  const hasNumber = /[0-9]/.test(pw)
  const hasSpecial = /[^A-Za-z0-9]/.test(pw)

  const count = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length

  return count >= 2
}
const shakeModal = () => {
  const modalContent = document.querySelector('.modal-content')
  if (modalContent) {
    modalContent.classList.add('shake')
    setTimeout(() => {
      modalContent.classList.remove('shake')
    }, 300)
  }
}

// ✨ 모달 바깥 클릭 시 흔들림
onMounted(() => {
  const modalEl = document.querySelector('.modal-bg')

  const handleClickOutside = (e) => {
    if (e.target === modalEl) {
      shakeModal()
    }
  }

  modalEl?.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    modalEl?.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.modal-bg {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 90vw;
  max-width: 30rem;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 2rem;
  height: 30.625rem;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
}

.btn-outline-dark {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: 0.12rem solid var(--color-gray-medium);
  cursor: pointer;
  padding: 0;
}
.btn-outline-dark img {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}
.btn-outline-dark:hover {
  background-color: var(--color-purple1);
}

.modal-body--center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  flex: 1;
}
.result-message {
  font-size: 1rem;
  color: var(--color-gray-dark);
  margin-bottom: 1rem;
}

.modal-input {
  width: 19rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 0.1rem solid var(--color-gray-medium);
  border-radius: 0.75rem;
  font-size: 1rem;
}

.error-message {
  color: var(--color-red);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.modal-footer {
  display: flex;
  justify-content: end;
}
.modal-footer > button {
  width: 6.75rem;
  height: 3.125rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-black);
  background-color: var(--color-white);
  border: 0.01rem solid var(--color-gray-medium);
  cursor: pointer;
}
.modal-footer > button:hover {
  background-color: var(--color-purple1);
  color: var(--color-white);
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-8px);
  }
  50% {
    transform: translateX(8px);
  }
  75% {
    transform: translateX(-8px);
  }
  100% {
    transform: translateX(0);
  }
}

.modal-content.shake {
  animation: shake 0.3s ease;
}
</style>
