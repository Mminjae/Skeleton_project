<template>
  <div id="join">
    <h3 id="joinHeader">회원가입</h3>
    <form @submit.prevent="submitForm">
      <!-- 이름 입력창 -->
      <div>
        <label>이름</label>
        <input v-model="form.name" type="text" />
      </div>
      <!-- 휴대폰 번호 입력창 -->
      <div>
        <label>핸드폰 번호</label>
        <input v-model="form.phone" type="text" @blur="validatePhone"/>
        <span v-if="errors.phone">{{ errors.phone }}</span>
      </div>
      <!-- 아이디 입력창 -->
      <div>
        <label>아이디</label>
        <input v-model="form.userId" type="text" @blur="validateuserId" />
        <span v-if="errors.userId">{{ errors.userId }}</span>
      </div>
      <!-- 이메일 입력창 -->
      <div>
        <label>이메일</label>
        <input v-model="form.email" type="text" @blur="validateEmail" />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>
      <!-- 비밀번호 -->
      <div>
        <label>비밀번호</label>
        <input v-model="form.password" type="password" @blur="validatePassword" />
        <span v-if="errors.password">{{ errors.password }}</span>
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input v-model="form.passwordRepeat" type="password" @blur="validatePasswordRepeat" />
        <span v-if="errors.passwordRepeat">{{ errors.passwordRepeat }}</span>
      </div>
      <button type="joinSubmit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  userId: '',
  email: '',
  password: '',
  passwordRepeat: ''
})


// 에러
const errors = reactive({
  phone: '',
  userId: '',
  email: '',
  password: '',
  passwordRepeat: ''
})

// 전화번호 유효성 검사
const validatePhone = () => { 
  const regex = /^[0-9]{10,11}$/
  errors.phone = regex.test(form.phone) ? '' : '숫자만 입력해주세요 (10~11자리)'
}
// 아이디 유효성 검사
const validateuserId = () => {
  const userId = form.userId.trim()

  // 특수문자 제외: 영문자 + 숫자만 허용 (4~16자)
  const regex = /^[a-zA-Z0-9]{4,16}$/

  if (!userId) {
    errors.userId = '아이디를 입력해주세요.'
  } else if (!regex.test(userId)) {
    errors.userId = '아이디는 영문자와 숫자만 포함해 4~16자여야 합니다.'
  } else {
    errors.userId = ''
  }
}
// 이메일 유효성 검사
const validateEmail = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.email = regex.test(form.email) ? '' : '유효한 이메일 형식이 아닙니다.'
}
const validatePassword = () => {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/
  errors.password = regex.test(form.password)
    ? ''
    : '숫자 및 특수문자를 포함해 6자리 이상 입력해주세요.'
}

const validatePasswordRepeat = () => {
  errors.passwordRepeat = form.password === form.passwordRepeat
    ? ''
    : '비밀번호가 일치하지 않습니다.'
}

// const submitForm = () => {
//   console.log('제출됨:', form.name)
// }

// 입력값 중복 검사
const submitForm = () => {
  validatePhone()
  validateUsername()
  validateEmail()
  validatePassword()
  validatePasswordRepeat()

// 입력값 오류 예외처리
const hasError = Object.values(errors).some(e => e)
  if (hasError) {
    alert('입력값을 다시 확인해주세요.')
    return
  }

  alert('회원가입 완료!') 
}

//초기화 넣어두기
</script>
