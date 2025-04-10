<template>
  <h3 id="joinHeader">회원가입</h3>
  <div id="joinPage">
    <form @submit.prevent="submitForm">
    <!-- 이름 입력창 -->
    <div>
      <label>이름</label>
      <input v-model="form.name" type="text" />
    </div>
     <!-- 생년월일 입력 -->
  <div class="form-group">
  <label for="birth">생년월일</label>
  <input
    id="birth"
    v-model="form.birth"
    type="date"
    class="form-input"
    @blur="validateBirth"
    placeholder="YYYY-MM-DD"
    />
  <span v-if="errors.birth" class="error-text">{{ errors.birth }}</span>
  </div>
    <!-- 이메일 입력창 -->
    <div>
      <label>이메일</label>
      <input v-model="form.email" type="text" @blur="validateEmail" />
      <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
    </div>
    <!-- 전화번호 입력창 -->
    <div>
      <label>전화번호</label>
      <input v-model="form.phone" type="text" @blur="validatePhone"/>
      <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
    </div>
    <!-- 아이디 입력창 -->
    <div>
      <label>아이디</label>
      <input v-model="form.userId" type="text" @blur="validateuserId" />
      <span v-if="errors.userId" class="error-text">{{ errors.userId }}</span>
    </div>
    <!-- 비밀번호 -->
    <div>
      <label>비밀번호</label>
      <input v-model="form.password" type="password" @blur="validatePassword" />
      <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
      <span v-else-if="passwordSuccess" class="success-text">{{ passwordSuccess }}</span>
    </div>

    <div>
      <label>비밀번호 확인</label>
      <input v-model="form.passwordRepeat" type="password" @blur="validatePasswordRepeat" />
      <span v-if="errors.passwordRepeat" class="error-text">{{ errors.passwordRepeat }}</span>
    </div>
    
  <!-- 프로필 이미지 영역: 기본이미지 or 업로드 이미지 -->
  <div class="profile-image-wrapper">
    <img
    :src="imagePreview || defaultImage"
    alt="프로필사진"
    class="profile-image"
  />
  </div>

    <!-- 이미지 (숨긴 input) (기본 파일 input 감추기) -->
  <input
  type="file"
  id="imageInput"
  accept="image/*"
  @change="handleImageChange"
  style="display: none;"
  />

    <!-- 라벨 버튼으로 사용자 업로드 유도 -->
    <label for="imageInput" class="upload-button">사진등록</label>


    <!-- 회원가입 버튼 -->
    <button type="submit">회원가입</button>
  </form>
</div>

</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
name: '',
birth: '',
phone: '',
userId: '',
email: '',
password: '',
passwordRepeat: ''
})


// 에러
const errors = reactive({
birth: '',
phone: '',
userId: '',
email: '',
password: '',
passwordRepeat: ''
})


// 생년월일 유효성 검사
const validateBirth = () => {
if (!form.birth) {
  errors.birth = '생년월일을 입력해주세요.'
} else {
  errors.birth = ''
}
}

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

// 비밀번호 유효성 검사
const validatePassword = () => {
const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/
if (regex.test(form.password)) {
  errors.password = ''
  passwordSuccess.value = '사용 가능한 비밀번호입니다.'
} else {
  errors.password = '숫자 및 특수문자를 포함해 6자리 이상 입력해주세요.'
  passwordSuccess.value = ''
}
}

const passwordSuccess = ref('')

const validatePasswordRepeat = () => {
errors.passwordRepeat = form.password === form.passwordRepeat
  ? ''
  : '비밀번호가 일치하지 않습니다.'
}

const imageFile = ref(null) // 이미지 파일 참조 추가
const imagePreview = ref('') // 이미지 미리보기 URL 참조 추가

// 이미지 파일 변경 시 처리 함수
const handleImageChange = event => {
const file = event.target.files[0]
if (!file) {
  imageFile.value = null
  imagePreview.value = ''
  return
}

imageFile.value = file

// 이미지 미리보기 생성
const reader = new FileReader()
reader.onload = e => {
  imagePreview.value = e.target.result
}
reader.readAsDataURL(file)
}
// 디폴트 이미지 보여주기
import defaultImageUrl from '@/assets/imgs/user.png'
const defaultImage = defaultImageUrl

// 입력값 중복 검사
const submitForm = () => {
validatePhone()
validateuserId()
validateEmail()
validatePassword()
validatePasswordRepeat()

const hasError = Object.values(errors).some(e => e)
if (hasError) {
  alert('입력값을 다시 확인해주세요.')
  return
}
alert('회원가입 완료!')
}
//초기화 넣어두기
</script>

<style scoped>
template {
padding: 2rem;
}

html {
font-size: 16px; /* 1rem = 16px 기준 */
}

#joinHeader {
font-size: 1.5rem;
font-weight: bold;
margin-bottom: 2rem;
text-align: left;
}

#joinPage {
max-width: 56.25rem; /* 900px */
margin: 3rem auto;
padding: 2rem;
background: #fff;
border-radius: 1rem;
box-shadow: 0 0 1rem rgba(0, 0, 0, 0.05);
}

/* 전체 form을 좌우 2열로 구성 */
form {
display: flex;
gap: 2rem;
flex-wrap: wrap;
}

input {
width: 21rem; /* 320px */
}

input {
height: 2.5rem; /* 고정 높이 */
/* 혹은 패딩으로 높이 조절 */
padding: 0.75rem 1rem;
}

/* 왼쪽: input 영역 (세로 정렬) */
form > div:not(.profile-image-wrapper):not(.upload-button) {
flex: 1 1 60%;
display: flex;
flex-direction: column;
margin-bottom: 1rem;
}

label {
font-size: 1rem;
font-weight: bold;
margin-bottom: 0.5rem;
}

input[type="text"],
input[type="password"],
input[type="date"],
input[type="email"],
input[type="number"] {
width: 100%;
padding: 0.625rem;
font-size: 0.875rem;
border: 1px solid #ccc;
border-radius: 0.375rem;
box-sizing: border-box;
margin-bottom: 0.5rem;
}

.error-text,
span.error-text {
position: left;
color: red;
font-size: 0.8125rem;
margin-top: -0.25rem;
margin-bottom: 0.5rem;
}

span.success-text {
position: left;
color: blue;
font-size: 0.8125rem;
margin-top: -0.25rem;
margin-bottom: 0.5rem;
}

/* 오른쪽: 프로필 이미지 + 버튼 */
.profile-image-wrapper {
flex: 0 0 30%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
padding-top: 1rem;
}

.profile-image {
width: 7.5rem;
height: 7.5rem;
border-radius: 50%;
object-fit: cover;
border: 1px solid #ccc;
margin-bottom: 1rem;
}

.upload-button {
display: inline-block;
background-color: #eee;
color: #333;
padding: 0.5rem 1.25rem;
font-size: 0.875rem;
border-radius: 0.5rem;
border: 1px solid #ccc;
cursor: pointer;
}

/* 회원가입 버튼 */
button[type="submit"] {
display: inline-block;
background-color: #f5f5f5; /* 연회색 배경 */
color: #333; /* 글자색 */
border: 1px solid #ccc;
border-radius: 0.5rem;
padding: 0.5rem 1rem;
font-size: 1rem;
cursor: pointer;
text-align: center;
margin-top: 1rem;
transition: background-color 0.3s;
}

/* 유효성 검증 메시지 */
.error-text {
color: red;
font-size: 0.875rem;
margin-top: 0.25rem;
}

/* 사진첨부 버튼 */
.upload-button {
display: inline-block;
background-color: #f5f5f5; /* 연회색 배경 */
color: #333; /* 글자색 */
border: 1px solid #ccc;
border-radius: 0.5rem;
padding: 0.5rem 1rem;
font-size: 1rem;
cursor: pointer;
text-align: center;
margin-top: 1rem;
transition: background-color 0.3s;
}

.upload-button:hover {
background-color: #e0e0e0; /* hover 시 살짝 진한 회색 */
}
</style>