<script setup>
// import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const id = ref('')
const password = ref('')
const idError = ref('')
const pwError = ref('')
const showLoginForm = ref(false)
const isLoginActive = ref(false)
const activeButton = ref('');
const router = useRouter();

function handleClick(buttonType) {
  activeButton.value = buttonType;
  if (buttonType !== 'login')
    router.push('/' + buttonType);
}

async function login() {
  try {
    const res = await axios.get(
      `http://localhost:3000/users?username=${id.value}&password=${password.value}`,
    )

    if (res.data.length > 0) {
      alert('로그인 성공!')
      emit('login-success') // App.vue로 이벤트 보냄
    } else {
      alert('아이디 또는 비밀번호가 틀렸습니다.')
    }
  } catch (error) {
    console.error('로그인 에러:', error)
    alert('서버 오류가 발생했습니다.')
  } finally {
    showLoginForm.value = false
    id.value = ''
    password.value = ''
    idError.value = ''
    pwError.value = ''
    isLoginActive.value = false
  }
}

// const router = useRouter()
// 버튼 활성화 상태 변수
const isIdPwActive = ref(false)

// 아이디/비밀번호 찾기 버튼 클릭 시 모달 열기 + 버튼 활성화
function toggleIdPwModal() {
  showModal.value = true
  isIdPwActive.value = true
}

// 모달 닫힐 때 버튼 비활성화
function handleModalClose() {
  showModal.value = false
  isIdPwActive.value = false
}

// 로그인 공란 경고문 출력
// 로그인 폼 열기, 닫기
function toggleLogin() {
  if (!showLoginForm.value) {
    // 처음 클릭 → 로그인 폼 열기
    showLoginForm.value = true
    isLoginActive.value = true
  } else {
    // 폼이 열린 상태에서 다시 누른 경우
    const trimmedId = id.value.trim()
    const trimmedPw = password.value.trim()

    if (trimmedId && trimmedPw) {
      // 모두 입력 시 → 로그인
      login()
    } else if (trimmedId && !trimmedPw) {
      pwError.value = '비밀번호를 입력해주세요.'
      idError.value = ''
    } else if (!trimmedId && trimmedPw) {
      idError.value = '아이디를 입력해주세요.'
      pwError.value = ''
    } else {
      // 아무것도 입력 안 했을 때 → 로그인 폼 닫기
      showLoginForm.value = false
      idError.value = ''
      pwError.value = ''
      isLoginActive.value = false
    }
  }
}

// 모달 스크립트
import ModalIdpw from '@/components/modal/ModalIdpw.vue'
const showModal = ref(false)

//버튼 엑티브 스크립트
</script>

<template>
  <div class="navClass">
    <nav id="nav">
      <h1>
        <img
          role=button
          @click="handleClick('')"
          src="../assets/imgs/logo.png"
          alt="사이트로고" />
      </h1>

      <!-- 로그인 폼 영역 -->
      <div class="nav-login-wrapper">
        <transition name="slide-fade">
          <form class="bar-login-form" v-show="showLoginForm">
              <label class="login-form-label">ID</label>
              <input type="text" placeholder="아이디" v-model="id" />
              <div class="login_id_error" v-show="idError">{{ idError }}</div>

              <label class="login-form-label">PW</label>
              <input type="password" placeholder="비밀번호" v-model="password" />
              <div class="login_pw_error" v-show="pwError">{{ pwError }}</div>

              <div class="login-form--remember">
                <input class="login-form--checkbox" type="checkbox" />
                <span>로그인 정보 저장</span>
              </div>
          </form>
        </transition>
      </div>

      <div class="nav-bar-btnbox">
        <button
          class="btn-unclicked nav-bar__button--login"
          @click="() => {handleClick('login'); toggleLogin();}"
          :class="{ active: isLoginActive }"
        >
          로그인
        </button>
        <button
          :class="activeButton === 'signUp' ? 'btn-clicked' : 'btn-unclicked'"
          @click="handleClick('signUp')"
        >
          회원가입
        </button>
        <button
          class="btn-unclicked nav-bar__button--idpw"
          @click="toggleIdPwModal"
          :class="{ active: isIdPwActive }"
        >
          아이디/비밀번호 찾기
        </button>
      </div>
      <ModalIdpw v-if="showModal" @close="handleModalClose" />
    </nav>
  </div>
</template>

<style scoped>
#nav {
  position: relative;
  display: flex; /* 1.레이아웃 */
  flex-direction: column;

  width: calc(var(--space-xl) * 7.5); /* 2.BOX */
  height: 100vh;

  background-color: var(--color-purple); /* 3.배경 */
}
#nav,
#nav > * {
  align-items: center;
  text-align: center;
}

h1 {
  margin-top: calc(var(--space-m) * 2.5);
}
h1 img {
  width: calc(var(--space-m) * 7.5);
  height: calc(var(--space-m) * 7.5);
}

.nav-bar-btnbox {
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 5%;
}
.nav-bar-btnbox button {
  width: calc(var(--space-xl) * 5.5);
  height: calc(var(--space-xl) * 1.7);
  border-radius: var(--space-l);
  border: none;
  padding: 0 var(--space-m);
  margin-bottom: var(--space-m);
  align-items: center;
  font-size: var(--font-base);
}
.nav-bar-btnbox button:hover,
.btn-clicked {
  background-color: var(--color-purple9);
  color: var(--color-white);
}
.btn-unclicked {
  background-color: var(--color-purple);
  color: var(--color-black);
}

.bar-login-form {
  display: flex;
  margin-top: calc(var(--space-m) * 4);
  flex-direction: column;
  align-items: flex-start;
  color: var(--color-black);
}
.bar-login-form label {
  margin-bottom: calc(var(--space-m) / 3);
}
.bar-login-form input[type='text'],
.bar-login-form input[type='password'] {
  height: calc(var(--space-m) * 2.5);
  width: calc(var(--space-m) * 11);
  border-radius: var(--space-s);
  margin-bottom: var(--space-s);
  padding: 0 var(--space-m);
  border: none;
}
.login-form--remember {
  display: flex;
  align-items: center;
  margin-top: var(--space-s);
  gap: var(--space-s);
  font-size: var(--font-s);
}
.login-form--checkbox {
  /* 기본 스타일 제거 */
  all: unset;
  /* 체크박스 기본 틀 */
  width: var(--space-m);
  height: var(--space-m);
  border-radius: 0.25rem;
  background-color: var(--color-white);
  cursor: pointer;
  position: relative;
  display: inline-block;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

/* 체크 시 상태 */
.login-form--checkbox:checked {
  background-color: var(--color-purple9);
}

/* 체크 마크 만들기 */
.login-form--checkbox:checked::after {
  content: '';
  position: absolute;
  top: 40%;
  left: 50%;
  width: 0.35rem;
  height: 0.7rem;
  border: solid var(--color-white);
  border-width: 0 0.15rem 0.15rem 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

/* 마우스 올렸을 때 부드럽게 */
.login-form--checkbox:hover {
  border-color: var(--color-purple9);
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* 로그인 인풋창 에러경고문  */
.login_id_error,
.login_pw_error {
  font-size: var(--font-s);
  color: var(--color-red);
  margin: 0 0 calc(var(--space-s)) var(--space-s);
}

.router-button,
.nav-bar__button--login {
  transition: background-color 0.3s ease;
}
.nav-bar__button--idpw {
  transition: background-color 0.3s ease;
}

/* 모달 스타일링 */
.find-account-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-bar__button--login.active,
.nav-bar__button--idpw.active,
.router-button.active {
  background-color: var(--color-purple9);
  color: var(--color-white);
}
@media screen and (max-width: 320px) {
  #nav {
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--space-s);
    background-color: var(--color-purple);
    z-index: 999;
  }
}
</style>
