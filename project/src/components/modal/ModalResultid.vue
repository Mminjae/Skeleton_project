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

        <!-- 내용 -->
        <div class="modal-body modal-body--center">
          <p class="result-message">회원님의 아이디는 다음과 같습니다.</p>
          <div class="result-id-box">{{ foundId }}</div>
        </div>

        <!-- 확인 버튼 -->
        <div class="modal-footer">
          <button class="btn btn-primary--id" @click="$emit('close')">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({
  foundId: String,
})
// ✨ 흔들림 효과용 로직
onMounted(() => {
  const modalEl = document.querySelector('.modal-bg')

  const handleClickOutside = (e) => {
    if (e.target === modalEl) {
      const modalContent = modalEl.querySelector('.modal-content')
      modalContent.classList.add('shake')
      setTimeout(() => {
        modalContent.classList.remove('shake')
      }, 300)
    }
  }

  modalEl.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    modalEl.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
/* 모달 배경 */
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

/* 모달 박스 */
.modal-content {
  width: 90vw;
  max-width: 30rem;
  background-color: var(--color-white);
  border-radius: 1rem;

  padding: 2rem;
  width: 30rem;
  height: 30.625rem;
}

/* 헤더 */
.modal-header {
  display: flex;
  justify-content: flex-end;
}

/* 닫기 버튼 */
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

/* 본문 */
.modal-body--center {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  text-align: center;
  padding: 2rem;
  flex: 1; /* 남은 공간을 채워줌 */
}
.result-message {
  font-size: 1rem;
  color: var(--color-gray-dark);
  margin-bottom: 1rem;
}
.result-id-box {
  background-color: var(--color-white);
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
  width: 19rem;
  color: var(--color-purple1);
  border: 0.1rem solid var(--color-purple1);
  margin-bottom: 2rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
}

/* 확인 버튼 */
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
