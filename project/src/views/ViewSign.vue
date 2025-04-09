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
      <button type="joinSubmit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  phone: ''
})

const errors = reactive({
  phone: ''
})

const validatePhone = () => {
  const regex = /^[0-9]{10,11}$/
  errors.phone = regex.test(form.phone) ? '' : '숫자만 입력해주세요 (10~11자리)'
}

const submitForm = () => {
  console.log('제출됨:', form.name)
}
</script>
