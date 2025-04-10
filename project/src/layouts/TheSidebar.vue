<template>
<<<<<<< HEAD
  <div :class="navClass">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link nav-link-small" to="/">비로그인 홈</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login">기기로그인 월별재정요약</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/History">최근 거래</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/mypage">마이페이지</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profileEdit">회원 정보 수정</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/signUp">회원가입</router-link>
        >>>>>>> main
      </li>
    </ul>
  </div>
</template>
=======
  <nav id="nav">
    <img class="nav-logo" src="https://ifh.cc/g/XGycR8.png" alt="nav로고" />
>>>>>>> b59f2c2f4348634b97da3360075aa407b8c6e9e8

    <!-- 로그인 폼 영역 -->
    <div class="nav-login-wrapper">
      <transition name="slide-fade">
        <form class="bar-login-form" v-show="showLoginForm">
          <div class="login-form-wrapper">
            <label class="login-form-label">ID</label>
            <input type="text" placeholder="아이디" v-model="id" />
            <div class="login_id_error">{{ idError }}</div>
            <label class="login-form-label">PW</label>
            <input type="password" placeholder="비밀번호" v-model="password" />
            <div class="login_pw_error">{{ pwError }}</div>
            <div class="login-form--remember">
              <input class="login-form--checkbox" type="checkbox" />
              <span>로그인 정보 저장</span>
            </div>
          </div>
        </form>
      </transition>
    </div>

    <!-- 항상 하단에 고정될 버튼 영역 -->
    <div class="nav-bar__button">
      <router-link to="/membershipguide" class="router-button" active-class="active"
        >회원가입</router-link
      >
      <button
        class="nav-bar__button--login"
        @click="toggleLogin"
        :class="{ active: isLoginActive }"
      >
        로그인
      </button>
      <button
        class="nav-bar__button--idpw"
        @click="toggleIdPwModal"
        :class="{ active: isIdPwActive }"
      >
        아이디/비밀번호 찾기
      </button>
    </div>

    <!-- 모달 -->
    <ModalIdpw v-if="showModal" @close="handleModalClose" />
  </nav>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 버튼 활성화 상태 변수
const isLoginActive = ref(false)
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

const showLoginForm = ref(false)
const id = ref('')
const password = ref('')

function goToGuide() {
  router.push('/membershipguide')
}

// 로그인 공란 경고문 출력
// 로그인 폼 열기, 닫기
const idError = ref('')
const pwError = ref('')
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

function login() {
  alert(`로그인 시도! ID: ${id.value}, PW: ${password.value}`)
  showLoginForm.value = false
  id.value = ''
  password.value = ''
  idError.value = ''
  pwError.value = ''
  isLoginActive.value = false
}
// 모달 스크립트
import ModalIdpw from '@/components/modal/ModalIdpw.vue'
const showModal = ref(false)

//버튼 엑티브 스크립트
</script>

<style>
#nav {
  display: flex;
  position: relative;
  float: left;
  flex-direction: column;
  align-items: center;
  width: 18.75rem; /* 300px */
  height: 64rem;
  background-color: var(--color-purple4);
  justify-content: space-between; /* 위, 아래로 배치 */
}

.nav-logo {
  display: flex;
  position: relative;
  border-radius: 50%;
  background-color: #e5e3dc;
  border: 0.31rem solid var(--color-gray-medium);
  margin: 5rem 0 0 0;
  width: 10rem;
  height: 10rem;
}
.login-form-wrapper {
  display: flex;
  margin-top: 13rem;
  flex-direction: column;
  align-items: flex-start;
  width: 12.5rem; /* 인풋과 체크박스 너비를 정확히 맞춤 */
  font-weight: 600;
}
.bar-login-form input[type='text'],
.bar-login-form input[type='password'] {
  height: 2.5rem;
  border-radius: 0.375rem;
  padding: 0 0.625rem;
  /* border: 1px solid var(--color-gray-medium); */
  border: 1px solid var(--color-purple3);
  width: 12.5rem;
  margin-bottom: 0.1rem;
}
.login-form--remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.625rem;
}
.login-form--checkbox {
  /* 기본 스타일 제거 */
  all: unset;
  font-size: 1rem;
  /* 체크박스 기본 틀 */
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid var(--color-purple1); /* 연보라 테두리 */
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
  background-color: var(--color-purple1); /* 진보라 배경 */
  border-color: var(--color-purple1);
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
  border-color: var(--color-purple1);
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* 위에서 내려옴 */
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
/* 로그인 인풋창 에러경고문  */
.login_id_error,
.login_pw_error {
  font-size: 1rem;
  color: var(--color-red);
  margin-bottom: 0.5rem;
  min-height: 1rem; /* 공간 확보 */
}

/* 버튼 속성 지정 */
.router-button,
.nav-bar__button--login {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 13.125rem;
  height: 4.25rem; /* 80px */
  margin: 0.5rem 0;
  background-color: var(--color-purple4);
  border: none;
  border-radius: 2.5rem; /* 40px */
  color: var(--color-black);
  font-weight: 600;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  border-radius: 1.875rem; /* 30px */
  padding: 0 2.5rem; /* 40px */
  margin-bottom: 1.625rem;
}
.nav-bar__button--idpw {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 13.125rem;
  height: 4.25rem; /* 80px */
  margin: 0.5rem 0;
  border-radius: 1.875rem; /* 30px */
  padding: 0 2.5rem; /* 40px */
  margin-bottom: 1.625rem;
  background-color: var(--color-purple4);
  border: none;
  border-radius: 2.5rem; /* 40px */
  color: var(--color-black);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  font-size: 1.2rem;
  white-space: nowrap;
}

/* 모달 스타일링링 */
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
  background-color: var(--color-purple2);
  color: white;
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
    padding: 0.5rem;
    background-color: var(--color-purple4);
    z-index: 999;
  }

  .nav-logo {
    width: 3rem;
    height: 3rem;
    margin: 0.3rem 0;
    border: 2.5rem;
  }

  .nav-login-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .bar-login-form {
    width: 90%;
  }

  .login-form-wrapper {
    width: 100%;
    margin-top: 0;
    padding: 0.5rem;
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
    background-color: var(--color-purple2);
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
