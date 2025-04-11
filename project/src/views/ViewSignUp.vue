<template>
  <div class="viewSignUp">
    <h2 id="joinHeader">회원가입</h2>
    <div id="joinPage">
      <form class="join-form" @submit.prevent="submitForm">
        <div class="area-input">
          <!-- 이름 입력창 -->
          <div class="input-box">
            <label>이름</label>
            <input v-model="form.name" type="text" />
          </div>

          <!-- 생년월일 입력 -->
          <div class="input-box">
            <label for="birth">생년월일</label>
            <input
              id="birth"
              v-model="form.birth"
              type="date"
              class="form-input"
              @blur="validateBirth"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <span v-if="errors.birth" class="error-text">{{ errors.birth }}</span>
          <!-- 이메일 입력창 -->
          <div class="input-box">
            <label>이메일</label>
            <input v-model="form.email" type="text" @blur="validateEmail" />
          </div>
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
          <!-- 전화번호 입력창 -->
          <div class="input-box">
            <label>전화번호</label>
            <input v-model="form.phone" type="text" @blur="validatePhone" />
          </div>
          <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
          <!-- 아이디 입력창 -->
          <div class="input-box">
            <label>아이디</label>
            <input v-model="form.userId" type="text" @blur="validateuserId" />
          </div>
          <span v-if="errors.userId" class="error-text">{{ errors.userId }}</span>
          <!-- 비밀번호 입력창 -->
          <div class="input-box">
            <label>비밀번호</label>
            <input v-model="form.password" type="password" @blur="validatePassword" />
          </div>
          <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
          <span v-else-if="passwordSuccess" class="success-text">{{ passwordSuccess }}</span>
          <div class="input-box">
            <label>비밀번호 재확인</label>
            <input v-model="form.passwordRepeat" type="password" @blur="validatePasswordRepeat" />
          </div>
          <span v-if="errors.passwordRepeat" class="error-text">{{ errors.passwordRepeat }}</span>
        </div>

        <div class="area-button">
          <!-- 프로필 이미지 영역: 기본이미지 or 업로드 이미지 -->
          <div class="profile-image-wrapper">
            <img :src="imagePreview || defaultImage" alt="프로필사진" class="profile-image" />
          </div>

          <!-- 이미지 (숨긴 input) (기본 파일 input 감추기) -->
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            @change="handleImageChange"
            style="display: none"
          />
          <!-- 라벨 버튼으로 사용자 업로드 유도 -->
          <label for="imageInput" class="upload-button">사진등록</label>
          <!-- 회원가입 버튼 -->
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
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
  passwordRepeat: '',
})

const errors = reactive({
  birth: '',
  phone: '',
  userId: '',
  email: '',
  password: '',
  passwordRepeat: '',
})

const passwordSuccess = ref('')

const imageFile = ref(null)
const imagePreview = ref('')
import defaultImageUrl from '@/assets/imgs/user.png'
const defaultImage = defaultImageUrl

const validateBirth = () => {
  if (!form.birth) {
    errors.birth = '생년월일을 입력해주세요.'
  } else {
    errors.birth = ''
  }
}

const validatePhone = () => {
  const regex = /^[0-9]{10,11}$/
  errors.phone = regex.test(form.phone) ? '' : '숫자만 입력해주세요 (10~11자리)'
}

const validateuserId = () => {
  const userId = form.userId.trim()
  const regex = /^[a-zA-Z0-9]{4,16}$/
  if (!userId) {
    errors.userId = '아이디를 입력해주세요.'
  } else if (!regex.test(userId)) {
    errors.userId = '아이디는 영문자와 숫자만 포함해 4~16자여야 합니다.'
  } else {
    errors.userId = ''
  }
}

const validateEmail = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.email = regex.test(form.email) ? '' : '유효한 이메일 형식이 아닙니다.'
}

const validatePassword = () => {
  const password = form.password
  const lengthValid = password.length >= 10
  // 각 조건 검사
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  // 총 몇 가지 종류가 포함되어 있는지 확인
  const typesCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length
  if (!lengthValid || typesCount < 2) {
    errors.password = '비밀번호는 10자 이상이며, 대소문자/숫자/특수문자 중 2가지 이상을 포함해야 합니다.'
    passwordSuccess.value = ''
  } else {
    errors.password = ''
    passwordSuccess.value = '사용 가능한 비밀번호입니다.'
  }
}

const validatePasswordRepeat = () => {
  errors.passwordRepeat =
    form.password === form.passwordRepeat ? '' : '비밀번호가 일치하지 않습니다.'
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (!file) {
    imageFile.value = null
    imagePreview.value = ''
    return
  }

  imageFile.value = file

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

// 🚀 여기부터 수정된 부분!
const submitForm = async () => {
  validatePhone()
  validateuserId()
  validateEmail()
  validatePassword()
  validatePasswordRepeat()

  const hasError = Object.values(errors).some((e) => e)
  if (hasError) {
    alert('입력값을 다시 확인해주세요.')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        birth: form.birth,
        phone: form.phone,
        userId: form.userId,
        email: form.email,
        password: form.password,
        // 필요시 imagePreview (base64) 도 저장 가능
      }),
    })

    if (!response.ok) throw new Error('회원가입 실패')

    alert('회원가입이 완료되었습니다!')

    // 입력 초기화
    Object.keys(form).forEach((key) => (form[key] = ''))
    imageFile.value = null
    imagePreview.value = ''
  } catch (error) {
    console.error(error)
    alert('회원가입 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.viewSignUp {
  position: relative;
  background-color: var(--color-white);
  color: var(--color-gray-black);
  width: 80%;
}
h2 {
  padding: var(--space-xl) 0 var(--space-xl) 2.5rem;
  color: var(--color-black);
}
button {
  border: none;
  background-color: transparent;
}

#joinPage {
  width: 65%;
  margin: 1rem 0 0 5rem;
  padding: 2rem;
  background: var(--color-white);
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.05);
  position: relative;
}

.area-input {
  width: 70%;
  margin-bottom: 4rem;
  position: relative;
}
.area-input > span {
  position: absolute;
  right: 0;
  padding-top: 0.4rem;
}

.join-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.input-box {
  display: flex;
  gap: 4rem;
  margin: 1rem 0 0 1rem;
  padding-top: 1rem;
  align-items: center;
}
.input-box label {
  font-size: var(--font-m);
  color: var(--color-black);
  width: 200px;
}
.input-box input {
  width: 100%;
  height: 2.5rem;
  padding: 0.75rem 1rem;
  font-size: var(--font-m);
  border: 1px solid var(--color-gray-light);
  border-radius: 0.4rem;
}
.input-box span {
  position: left;
  font-size: var(--font-s);
  margin-top: -0.25rem;
  margin-bottom: 0.5rem;
}

.area-button {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding-right: 6%;
  position: relative;
}
.area-button label {
  text-align: center;
}

/* 전체 form을 좌우 2열로 구성 */
/* form {
display: flex;
gap: 2rem;
flex-wrap: wrap;
} */

/* input {
  width: 21rem;
} */

/* input {
height: 2.5rem;
padding: 0.75rem 1rem;
} */

/* 왼쪽: input 영역 (세로 정렬) */
/* form > div:not(.profile-image-wrapper):not(.upload-button) {
flex: 1 1 60%;
display: flex;
flex-direction: column;
margin-bottom: 1rem;
} */

/* label {
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
} */
/* 
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
} */

/* 오른쪽: 프로필 이미지 + 버튼 */
/* .profile-image-wrapper {
flex: 0 0 30%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
padding-top: 1rem;
} */

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
  background-color: var(--color-white);
  color: var(--color-black);
  padding: 0.5rem 1.25rem;
  font-size: var(--font-s);
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray-light);
  cursor: pointer;
}

/* 회원가입 버튼 */
button[type='submit'] {
  position: absolute;
  display: inline-block;
  background-color: var(--color-white);
  color: var(--color-black);
  border: 1px solid var(--color-gray-light);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: var(--font-s);
  text-align: center;
  margin-top: 20rem;
  right: 10%;
  width: 7.5rem;
  bottom: 2rem;
}

/* 유효성 검증 메시지 */
.error-text {
  color: var(--color-red);
  font-size: var(--font-s);
}

.success-text {
  color: var( --color-blue);
  font-size: var(--font-s);
}

.success-text {
  color: var( --color-blue);
  font-size: var(--font-s);
}

/* 사진첨부 버튼 */
/* .upload-button {
display: inline-block;
background-color: #f5f5f5;
color: #333;
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
background-color: #e0e0e0;
} */
</style>
