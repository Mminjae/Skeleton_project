<template>
  <div class="modal-bg" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- 입력 폼들 -->
        <div class="modal-header">
          <button class="btn btn-outline-dark" type="button" @click="$emit('close')">
            <img src="" alt="닫기" />
          </button>
        </div>
        <div class="modal-idpw">
          <button class="idpw-button" :class="{ active: mode === 'id' }" @click="switchToID">
            ID 찾기
          </button>
          <button class="idpw-button" :class="{ active: mode === 'pw' }" @click="switchToPW">
            PW 찾기
          </button>
        </div>
        <form>
          <!-- ID 찾기 -->
          <!-- ID 찾기 -->
          <div v-if="mode === 'id'" class="mb-3">
            <label>이름</label>
            <input
              type="text"
              class="form-control"
              v-model="name"
              :class="{ 'input-error': nameError }"
            />
          </div>
          <div class="form__name-error" v-if="mode === 'id' && nameError">
            {{ nameError }}
          </div>

          <div v-if="mode === 'id'" class="mb-3">
            <label>이메일</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              :class="{ 'input-error': emailError }"
            />
          </div>

          <!-- PW 찾기 -->
          <div v-if="mode === 'pw'" class="mb-3">
            <label>ID</label>
            <input
              type="text"
              class="form-control"
              v-model="id"
              :class="{ 'input-error': idError }"
            />
          </div>
          <div class="form__id-error" v-if="mode === 'pw' && idError">
            {{ idError }}
          </div>

          <div v-if="mode === 'pw'" class="mb-3">
            <label>이메일</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              :class="{ 'input-error': emailError }"
            />
          </div>

          <!-- 공통 이메일 에러 메시지 출력 -->
          <div class="form__email-error" v-if="emailError && (mode === 'id' || mode === 'pw')">
            {{ emailError }}
          </div>

          <!-- 전체 실패 메시지 -->
          <div class="form__entier-error" v-if="entireError">
            {{ entireError }}
          </div>
        </form>

        <!-- 버튼 -->
        <div class="modal-footer">
          <button class="btn btn-primary--id" v-if="mode === 'id'" @click.prevent="handleFindID">
            ID 찾기
          </button>
          <button class="btn btn-primary--pw" v-if="mode === 'pw'" @click.prevent="handleFindPW">
            PW 찾기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ID/PW찾기 미입력 에러코드 //
const mode = ref('id')

const name = ref('')
const email = ref('')
const id = ref('')

// 에러 메시지 저장용
const nameError = ref('')
const emailError = ref('')
const idError = ref('')
const entireError = ref('')

function switchToID() {
  mode.value = 'id'
  clearErrors()
  clearInputs()
}

function switchToPW() {
  mode.value = 'pw'
  clearErrors()
  clearInputs()
}

function clearErrors() {
  nameError.value = ''
  emailError.value = ''
  idError.value = ''
  entireError.value = ''
}

function clearInputs() {
  name.value = ''
  email.value = ''
  id.value = ''
}

function handleFindID() {
  clearErrors()

  const isNameEmpty = !name.value.trim()
  const isEmailEmpty = !email.value.trim()

  if (isNameEmpty && isEmailEmpty) {
    nameError.value = '이름을 입력해주세요.'
    return
  }

  if (isNameEmpty) {
    nameError.value = '이름을 입력해주세요.'
    return
  }

  if (isEmailEmpty) {
    emailError.value = '이메일을 입력해주세요.'
    return
  }

  // 실제 회원 정보 확인 로직 대신 더미 조건 사용
  const isMatch = false // 항상 실패하는 가정 (임시)
  if (!isMatch) {
    entireError.value = '회원 정보가 일치하지 않습니다.'
  }
}
function handleFindPW() {
  clearErrors()

  const isIdEmpty = !id.value.trim()
  const isEmailEmpty = !email.value.trim()
  let hasError = false

  if (isIdEmpty && isEmailEmpty) {
    idError.value = 'ID를 입력해주세요.'
    hasError = true
  } else if (isIdEmpty) {
    idError.value = 'ID를 입력해주세요.'
    hasError = true
  } else if (isEmailEmpty) {
    emailError.value = '이메일을 입력해주세요.'
    hasError = true
  }

  if (hasError) return

  // 둘 다 입력된 경우 → 실제 회원 확인 로직
  const isMatch = false // 임시 실패 처리
  if (!isMatch) {
    entireError.value = '회원 정보가 일치하지 않습니다.'
  }
}
</script>

<style scoped>
/* 모달 외 배경 구성 CSS */
.modal-bg {
  display: flex;
  position: fixed;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
}
/* 모달 내 CSS */
.modal-content {
  width: 90vw;
  max-width: 30rem;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 2rem;
  width: 30rem;
}
.modal-content {
  width: 33.75rem;
  height: 30.625rem;
}
.modal-header {
  display: flex;
  justify-content: flex-end;
  position: relative;
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
  width: 2rem; /* 이미지 크기 조절 */
  height: 2rem;
  object-fit: contain;
}

.btn-outline-dark:hover {
  background-color: var(--color-purple1);
}
/* ID/PW 인풋 및 버튼 구성 */
.mb-3 > label {
  font-size: 1rem;
  font-weight: 700;
}
.modal-idpw {
  display: flex;
  position: relative;
  align-self: center;
}
.idpw-button {
  width: 6.875rem;
  height: 3.125rem;
  margin: 0 1rem 3rem;
  border: var(--color-black);
  border-radius: 0.625rem;
  background-color: var(--color-white);
  color: var(--color-black);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
}

/* ID/PW버튼 active 상태일 때 버튼 보라색으로 변경 */
.idpw-button.active {
  background-color: var(--color-purple1);
  color: var(--color-white);
}
/* 모달 하단  */
.modal-footer {
  display: flex;
  justify-content: end;
  margin-top: 1rem;
}
/* 모달 하단 ID/PW찾기 버튼 */
.modal-footer > button {
  width: 6.75rem;
  height: 3.125rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-black);
  background-color: var(--color-white);
  border: 0.01rem solid var(--color-gray-medium);
}
.modal-footer > button:hover {
  background-color: var(--color-purple1);
  color: var(--color-white);
}
/* 폼 에러 코드 출력 */
.form__name-error,
.form__email-error,
.form__id-error,
.form__entier-error {
  color: var(--color-red);
  font-size: 0.875rem;
  padding-bottom: 1rem;
}
.input-error {
  border: 0.1rem solid var(--color-red);
}
@media screen and (max-width: 320px) {
  .modal-content {
    width: 95vw;
    height: auto;
    padding: 1rem;
    border-radius: 0.75rem;
  }

  .modal-header {
    padding-bottom: 0.5rem;
  }

  .btn-outline-dark {
    width: 2.5rem;
    height: 2.5rem;
  }

  .btn-outline-dark img {
    width: 1.5rem;
    height: 1.5rem;
  }

  .modal-idpw {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }

  .idpw-button {
    width: 6rem;
    height: 2.5rem;
    font-size: 0.85rem;
    margin: 0;
  }

  .mb-3 > label {
    font-size: 0.85rem;
  }

  input.form-control {
    font-size: 0.85rem;
    padding: 0.4rem;
  }

  .form__name-error,
  .form__email-error,
  .form__id-error,
  .form__entier-error {
    font-size: 0.75rem;
    padding-bottom: 0.5rem;
  }

  .modal-footer {
    justify-content: center;
    margin-top: 1rem;
  }

  .modal-footer > button {
    width: 6rem;
    height: 2.5rem;
    font-size: 0.9rem;
  }
}
</style>
