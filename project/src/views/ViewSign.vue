<template>
  <div id="joinpage">
    <h3 id="joinHeader">회원가입</h3>
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
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>
      <!-- 전화번호 입력창 -->
      <div>
        <label>전화번호</label>
        <input v-model="form.phone" type="text" @blur="validatePhone"/>
        <span v-if="errors.phone">{{ errors.phone }}</span>
      </div>
      <!-- 아이디 입력창 -->
      <div>
        <label>아이디</label>
        <input v-model="form.userId" type="text" @blur="validateuserId" />
        <span v-if="errors.userId">{{ errors.userId }}</span>
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

  // 파일 크기 제한 (5MB)
  if (file.size > 5 * 1024 * 1024) {
    toastStore.showToast('이미지 크기는 5MB 이하여야 합니다.', 'error')
    event.target.value = '' // 파일 입력 초기화
    return
  }

  // 이미지 파일 타입 검증
  if (!file.type.match('image.*')) {
    toastStore.showToast('이미지 파일만 첨부할 수 있습니다.', 'error')
    event.target.value = '' // 파일 입력 초기화
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