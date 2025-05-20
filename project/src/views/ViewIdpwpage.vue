<template>
  <div class="idpw-page">
    <div class="page-header">
      <button class="btn btn-outline-dark" type="button" @click="goBack">이전</button>
    </div>

    <div class="idpw-mode-switch">
      <button class="idpw-button" :class="{ active: mode === 'id' }" @click="switchToID">
        ID 찾기
      </button>
      <button class="idpw-button" :class="{ active: mode === 'pw' }" @click="switchToPW">
        PW 찾기
      </button>
    </div>

    <form>
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
      <div class="form__name-error" v-if="mode === 'id' && nameError">{{ nameError }}</div>

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
        <input type="text" class="form-control" v-model="id" :class="{ 'input-error': idError }" />
      </div>
      <div class="form__id-error" v-if="mode === 'pw' && idError">{{ idError }}</div>

      <div v-if="mode === 'pw'" class="mb-3">
        <label>이메일</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          :class="{ 'input-error': emailError }"
        />
      </div>

      <div class="form__email-error" v-if="emailError && (mode === 'id' || mode === 'pw')">
        {{ emailError }}
      </div>
      <div class="form__entier-error" v-if="entireError">{{ entireError }}</div>
    </form>

    <div class="page-footer">
      <button class="btn btn-primary--id" v-if="mode === 'id'" @click.prevent="handleFindID">
        ID 찾기
      </button>
      <button class="btn btn-primary--pw" v-if="mode === 'pw'" @click.prevent="handleFindPW">
        PW 찾기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconIcon from '@/components/base/iconIcon.vue'
import axios from 'axios'

const router = useRouter()
const mode = ref('id')

const name = ref('')
const email = ref('')
const id = ref('')

const nameError = ref('')
const emailError = ref('')
const idError = ref('')
const entireError = ref('')

function goBack() {
  router.back()
}

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
  if (!name.value.trim()) nameError.value = '이름을 입력해주세요.'
  if (!email.value.trim()) emailError.value = '이메일을 입력해주세요.'
  if (nameError.value || emailError.value) return

  axios
    .get(`http://localhost:3000/users?name=${name.value}&email=${email.value}`)
    .then((res) => {
      if (res.data.length > 0) {
        alert(`ID는 ${res.data[0].userId} 입니다.`)
        router.push('/')
      } else {
        entireError.value = '회원 정보가 일치하지 않습니다.'
      }
    })
    .catch(() => {
      entireError.value = '서버 오류가 발생했습니다.'
    })
}

function handleFindPW() {
  clearErrors()
  if (!id.value.trim()) idError.value = 'ID를 입력해주세요.'
  if (!email.value.trim()) emailError.value = '이메일을 입력해주세요.'
  if (idError.value || emailError.value) return

  axios
    .get(`http://localhost:3000/users?id=${id.value}&email=${email.value}`)
    .then((res) => {
      if (res.data.length > 0) {
        alert('비밀번호 재설정 링크를 보냈습니다.')
        router.push('/')
      } else {
        entireError.value = '회원 정보가 일치하지 않습니다.'
      }
    })
    .catch(() => {
      entireError.value = '서버 오류가 발생했습니다.'
    })
}
</script>

<style scoped>
.idpw-page {
  max-width: 900px;
  min-width: 800px;
  margin: 4rem auto;
  padding: 3rem 4rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  min-height: 70vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.idpw-mode-switch {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
}

.idpw-button {
  padding: 1rem 3rem;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 8px;
  border: 2px solid var(--color-gray-light);
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.idpw-button.active {
  background-color: var(--color-purple1);
  color: white;
  border-color: var(--color-purple1);
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem 4rem;
  justify-content: center;
  align-items: start;
}

label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

input.form-control {
  width: 100%;
  height: 3.25rem;
  padding: 0.875rem 1.25rem;
  font-size: 1rem;
  border: 1px solid var(--color-gray-light);
  border-radius: 6px;
}

.input-error {
  border: 2px solid var(--color-red);
}

.form__name-error,
.form__email-error,
.form__id-error,
.form__entier-error {
  color: var(--color-red);
  font-size: 0.9rem;
  margin-top: 0.25rem;
  padding-left: 0.25rem;
  grid-column: span 2;
}

.page-footer {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.page-footer button {
  padding: 1rem 3rem;
  font-size: 1.125rem;
  font-weight: bold;
  border-radius: 8px;
  background-color: var(--color-purple1);
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.page-footer button:hover {
  background-color: var(--color-purple2);
}
</style>
