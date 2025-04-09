<template>
  <div id="join">
    <h3 id="joinHeader">회원가입</h3>
    <form @submit.prevent="submitForm">
      <!-- 이름 입력창 -->
      <div>
        <label class="joinLabel">이름</label>
        <input v-model="form.name" type="text" class="joinBox" />
      </div>
      <!-- 휴대폰 번호 입력창 -->
      <div>
        <label class="joinLabel">핸드폰 번호</label>
        <input v-model="form.phone" type="text" @blur="validatePhone" class="joinBox" />
        <span v-if="errors.phone">{{ errors.phone }}</span>
      </div>
      <!-- 아이디 입력창 -->
      <div>
        <label class="joinLabel">아이디</label>
        <input v-model="form.userId" type="text" @blur="validateuserId" class="joinBox" />
        <span v-if="errors.userId">{{ errors.userId }}</span>
      </div>
      <!-- <button type="joinSubmit">회원가입</button> -->
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  userId: ''
})


// 에러
const errors = reactive({
  phone: '',
  userId: ''
})

// 전화번호 유효성 검사
const validatePhone = () => { 
  const regex = /^[0-9]{10,11}$/
  errors.phone = regex.test(form.phone) ? '' : '숫자만 입력해주세요 (10~11자리)'
}
// 아이디 유효성 검사
const validateuserId = () => {
  const regex = /^[a-zA-Z0-9!@#$%^&*]{4,20}$/
  errors.userId = regex.test(form.userId) ? '' : '영문, 숫자, 특수문자 포함 4자 이상'
}

// const submitForm = () => {
//   console.log('제출됨:', form.name)
// }

//초기화 넣어두기
</script>
