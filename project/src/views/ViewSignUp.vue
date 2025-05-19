<template>
  <div class="viewSignUp">
    <h2 id="joinHeader">회원가입</h2>
    <div id="joinPage">
      <form class="join-form" @submit.prevent="submitForm">
        <div class="area-input">
          <!-- 이름 입력창 -->
          <!-- <div class="input-box">
            <label>이름</label>
            <input v-model="form.name" type="text" />
          </div> -->
          <div class="input-box">
            <label>이름</label>
            <input v-model="form.name" type="text" @blur="validateName" />
          </div>
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>

          <!-- 생년월일 입력 -->
          <div class="input-box">
            <label for="birth">생년월일</label>
            <input
              id="birth"
              v-model="form.birth"
              type="date"
              class="form-input"
              @blur="validateBirth"
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
          <img :src="imagePreview || defaultImage" alt="프로필사진" class="profile-image" />

          <!-- 이미지 (숨긴 input) (기본 파일 input 감추기) -->
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            @change="handleImageChange"
            style="display: none"
          />
          <!-- 라벨 버튼으로 사용자 업로드 유도 -->
          <label for="imageInput" class="upload-button">사진 등록</label>
          <!-- 회원가입 버튼 -->
          <button type="submit">회원가입</button>
        </div>
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
  name: '',
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
import defaultImageUrl from '@/assets/imgs/user-gray.svg'
const defaultImage = defaultImageUrl

const validateName = () => {
  const regex = /^[가-힣]{2,5}$/
  errors.name = regex.test(form.name) ? '' : '이름은 한글 2~5자여야 합니다.'
}

const validateBirth = () => {
  if (!form.birth) {
    errors.birth = '생년월일을 입력해주세요.'
  } else {
    errors.birth = ''
  }
}

const validatePhone = () => {
  const regex = /^01[016789]-\d{3,4}-\d{4}$/
  errors.phone = regex.test(form.phone) ? '' : '010-1234-5678 형식으로 입력해주세요.'
}

const validateuserId = () => {
  const userId = form.userId.trim()
  const regex = /^[a-zA-Z0-9]{4,16}$/
  if (!userId) {
    errors.userId = 'ID는 영문+숫자 조합 4~16자여야 합니다.'
  } else if (!regex.test(userId)) {
    errors.userId = 'ID는 영문+숫자 조합 4~16자여야 합니다.'
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
    errors.password =
      '비밀번호는 10자 이상이며, 대소문자/숫자/특수문자 중 2가지 이상을 포함해야 합니다.'
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

const submitForm = async () => {
  validateName()
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
        profileImage: imagePreview.value || '',
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
  padding: var(--space-l) 0 var(--space-s) calc(var(--space-m) * 2.5);
  color: var(--color-black);
  font-size: var(--font-xl);
}

#joinPage {
  width: calc(var(--space-m) * 50);
  margin: var(--space-m) 0 0 calc(var(--space-m) * 5);
  padding: var(--space-xl);
  background: var(--color-white);
  border-radius: var(--space-m);
  box-shadow: 0 0 var(--space-m) rgba(0, 0, 0, 0.05);
  position: relative;
}

.area-input {
  width: 70%;
  margin-bottom: calc(var(--space-m) * 4);
  position: relative;
}
.area-input > span {
  position: absolute;
  right: 0;
  padding-top: var(--space-s);
}

.join-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.input-box {
  display: flex;
  gap: calc(var(--space-m) * 3);
  margin: var(--space-m) 0 0 var(--space-m);
  padding-top: var(--space-m);
  align-items: center;
}
.input-box label {
  font-size: var(--font-m);
  color: var(--color-black);
  width: calc(var(--space-m) * 14);
}
.input-box input {
  width: 100%;
  height: calc(var(--space-m) * 2.5);
  padding: var(--space-m) 0.75rem var(--space-m) var(--space-m);
  font-size: var(--font-m);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--space-s);
}

.area-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc(var(--space-m) * 2);
  padding-right: 5%;
  position: relative;
}

.profile-image {
  width: calc(var(--space-m) * 7);
  height: calc(var(--space-m) * 7);
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: var(--space-m);
}

/* 버튼 */
.upload-button,
button[type='submit'] {
  display: inline-block;
  text-align: center;
  width: calc(var(--space-m) * 7.5);
  padding: 0.5rem var(--space-m);
  cursor: pointer;
  border: 1px solid var(--color-gray-light);
  border-radius: var(--space-s);
  font-size: 0.8rem;
  color: var(--color-black);
  background-color: var(--color-white);
}
button[type='submit'] {
  position: absolute;
  bottom: var(--space-s);
}

/* 유효성 검증 메시지 */
.error-text {
  color: var(--color-red);
  font-size: var(--font-s);
}

.success-text {
  color: var(--color-blue);
  font-size: var(--font-s);
}

.success-text {
  color: var(--color-blue);
  font-size: var(--font-s);
}
</style>
