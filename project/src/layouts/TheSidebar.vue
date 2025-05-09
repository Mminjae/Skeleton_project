<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const id = ref('')
const password = ref('')
const idError = ref('')
const pwError = ref('')
const showLoginForm = ref(false)
const isLoginActive = ref(false)
// const activeButton = ref('');
// const router = useRouter();

function handleClick(buttonType) {
  activeButton.value = buttonType;
  if (buttonType !== 'login')
    router.push('/' + buttonType);
}
const isIdPwActive = ref(false) // 아이디/비번 찾기 버튼 활성화용

// 로그인 시도
async function login() {
  try {
    const res = await axios.get(
      `http://localhost:3000/users?username=${id.value}&password=${password.value}`,
    )

    if (res.data.length > 0) {
      alert('로그인 성공!')
      // emit('login-success') // App.vue로 이벤트 보냄
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

// 로그인 공란 경고문 출력 및 폼 열고 닫기
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

// ✅ ID/PW 찾기 페이지로 이동
function goToFindIdPwPage() {
  isIdPwActive.value = true
  router.push('/find-idpw')
}
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
        <!-- 은우 수정한 부분 -->
        <!-- <button
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
          @click="toggleIdPwModal" -->
        <router-link class="nav-link">
          <button
            class="nav-bar-btn nav-bar__button--login"
            @click="toggleLogin"
            :class="{ active: isLoginActive }"
          >
            로그인
          </button>
        </router-link>

        <router-link class="nav-link" to="/signUp">
          <button class="nav-bar-btn">회원가입</button>
        </router-link>

        <!-- ✅ ID/PW 찾기 페이지로 이동 -->
        <button
          class="nav-bar-btn nav-bar__button--idpw"
          @click="goToFindIdPwPage"
          :class="{ active: isIdPwActive }"
        >
          아이디/비밀번호 찾기
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
#nav {
  position: relative;
  display: flex;
  flex-direction: column;

  width: calc(var(--space-xl) * 7.5); /* 2.BOX */
  height: 100vh;
  background-color: var(--color-purple);
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

/* 은우 수정한 부분 */
/* .nav-bar-btnbox {
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
  margin-bottom: var(--space-m); */
.nav-bar-btnbox {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 5%;
}
.nav-bar-btn {
  background-color: var(--color-purple);
  width: 13.125rem;
  height: 4.25rem;
  border-radius: 1.875rem;
  border: none;
  padding: 0 2.5rem;
  margin-bottom: 1.2rem;
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

/* .bar-login-form { */
.nav-login-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
.login-form-wrapper {
  display: flex;
  margin-top: calc(var(--space-m) * 8);
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
  all: unset;
  /* 체크박스 기본 틀 */
  width: var(--space-m);
  height: var(--space-m);
  border-radius: 0.25rem;
  border-radius: calc(var(--space-m) / 4);
  background-color: var(--color-white);
  cursor: pointer;
  position: relative;
  display: inline-block;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}
.login-form--checkbox:checked {
  background-color: var(--color-purple9);
}
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
.login-form--checkbox:hover {
  border-color: var(--color-purple9);
}
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
.nav-bar__button--login.active,
.nav-bar__button--idpw.active,
.router-button.active {
  background-color: var(--color-purple9);
  color: var(--color-white);
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
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
  .nav-logo {
    width: 3rem;
    height: 3rem;
    margin: 0.3rem 0;
    border: 2.5rem;
  }
  .bar-login-form input[type='text'],
  .bar-login-form input[type='password'] {
    width: 100%;
    height: 2rem;
    font-size: 0.8rem;
  }
  .login-form--remember {
    font-size: 0.75rem;
  }
  .nav-bar__button {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    margin: 0.5rem 0;
  }
  .nav-bar__button--login,
  .nav-bar__button--idpw,
  .router-button {
    all: unset;
    background-color: var(--color-purple9);
    padding: 0.4rem 0.8rem;
    border-radius: 1rem;
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
    text-align: center;
  }
  .login_id_error,
  .login_pw_error {
    font-size: 0.75rem;
    min-height: 1rem;
    color: var(--color-red);
  }
}
</style>
