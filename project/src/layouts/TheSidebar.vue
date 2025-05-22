<!-- TheSidebar.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useLoginStore } from '@/stores/useLoginStore'

const router = useRouter()
const loginStore = useLoginStore()

const id = ref('')
const password = ref('')
const idError = ref('')
const pwError = ref('')
const showLoginForm = ref(false)
const isLoginActive = ref(false)
const isIdPwActive = ref(false)

// 로그인 시도
async function login() {
  try {
    const res = await axios.get(
      `http://localhost:3000/users?userId=${id.value}&password=${password.value}`,
    )

    if (res.data.length > 0) {
      const user = res.data[0]
      alert('로그인 성공!')
      loginStore.login() // ✅ 상태 변경 함수 사용

      await axios.put('http://localhost:3000/loggedInUser', {
        userId: user.userId,
      })
      localStorage.setItem('loggedInUser', user.id)

      router.push('/main')
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

// 로그인 버튼 동작
function toggleLogin() {
  if (!showLoginForm.value) {
    showLoginForm.value = true
    isLoginActive.value = true
  } else {
    const trimmedId = id.value.trim()
    const trimmedPw = password.value.trim()

    if (trimmedId && trimmedPw) {
      login()
    } else {
      idError.value = trimmedId ? '' : '아이디를 입력해주세요.'
      pwError.value = trimmedPw ? '' : '비밀번호를 입력해주세요.'
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
    <nav id="nav-default">
      <h1>
        <img
          role="button"
          @click="() => router.push('/')"
          src="../assets/imgs/logo.png"
          alt="사이트로고"
        />
      </h1>

      <div class="nav-login-wrapper">
        <transition name="slide-fade">
          <form class="bar-login-form" v-show="showLoginForm">
            <label class="login-form-label">ID</label>
            <input type="text" placeholder="아이디" v-model="id" />
            <div class="login_id_error" v-if="idError">{{ idError }}</div>

            <label class="login-form-label">PW</label>
            <input
              type="password"
              placeholder="비밀번호"
              v-model="password"
              @keyup.enter="toggleLogin"
            />
            <div class="login_pw_error" v-if="pwError">{{ pwError }}</div>

            <div class="login-form--remember">
              <input class="login-form--checkbox" type="checkbox" />
              <span>로그인 정보 저장</span>
            </div>
          </form>
        </transition>
      </div>

      <div class="nav-bar-btnbox">
        <button
          type="submit"
          class="nav-bar-btn nav-bar__button--login"
          @click="toggleLogin"
          :class="{ active: isLoginActive }"
        >
          로그인
        </button>

        <router-link class="nav-link" to="/signUp">
          <button class="nav-bar-btn">회원가입</button>
        </router-link>

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
/*---nav아웃라인---*/
#nav-default {
  position: relative; /* ✅ 변경 */
  z-index: 0; /* ✅ 명시적으로 낮춤 */
  display: flex;
  flex-direction: column;
  width: calc(var(--space-xl) * 7.5);
  height: 100vh;
  background-color: var(--color-purple);
}
#nav-default,
#nav-default > * {
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
/*---nav아웃라인 END---*/

/*---버튼박스 영역---*/
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
/*---버튼박스 영역 END---*/

/*---로그인폼 영역---*/
.nav-login-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
.bar-login-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.bar-login-form label {
  margin-top: 0.5rem;
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
  width: var(--space-m);
  height: var(--space-m);
  border-radius: calc(var(--space-m) / 4);
  background-color: var(--color-white);
  cursor: pointer;
  position: relative;
  display: inline-block;
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
.login_id_error,
.login_pw_error {
  font-size: var(--font-s);
  color: var(--color-red);
  margin: 0 0 calc(var(--space-s)) var(--space-s);
}
/*---로그인폼 영역 END---*/

/*---트랜지션 효과---*/
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
/*---트랜지션 END---*/

/*---반응형 모바일---*/
@media screen and (max-width: 320px) {
  #nav-default {
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
    z-index: auto;
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
  .login_id_error,
  .login_pw_error {
    font-size: 0.75rem;
    min-height: 1rem;
    color: var(--color-red);
  }
}
/*---반응형 END---*/
</style>
