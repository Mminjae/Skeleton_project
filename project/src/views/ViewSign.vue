<template>
  <div id="join">
    <h3 id="joinHeader">회원가입</h3>
    <form @submit.prevent="submitForm">
      <!-- 이름 -->
      <div>
        <label class="joinLabel">이름</label>
        <input v-model="form.name" type="text" class="joinBox" />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: ''
})

const submitForm = () => {
  console.log('제출됨:', form.name)
}
</script>
