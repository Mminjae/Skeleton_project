<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/useLoginStore' //  추가
import axios from 'axios'
import defaultProfile from '@/assets/imgs/user-gray.svg'

const userName = computed(() => loginStore.user?.name || '이름 없음')
const profileImage = computed(() => loginStore.user?.profileImage || '')

onMounted(() => {
  loginStore.fetchLoggedInUser()
})

const loginStore = useLoginStore() //추가
// const currentPath = ref('/login')
const activeButton = ref('')
const router = useRouter()

function handleClick(buttonType) {
  activeButton.value = buttonType
  router.push('/' + buttonType)
}

async function logout() {
  try {
    await axios.put('http://localhost:3000/loggedInUser', {
      userId: '',
    })

    loginStore.logout()
    alert('로그아웃 되었습니다.')
    router.push('/')
  } catch (error) {
    console.error('로그아웃 실패:', error)
    alert('로그아웃 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <div class="navClass">
    <nav id="nav">
      <h1>
        <img
          role="button"
          @click="handleClick('main')"
          src="../assets/imgs/logo.png"
          alt="사이트로고"
        />
      </h1>

      <div class="nav-bar-profile">
        <img :src="profileImage || defaultProfile" alt="사용자프로필" class="profile-img" />
      </div>
      <span class="nav-bar-userName">{{ userName }}님</span>

      <div class="nav-bar-btnbox">
        <button
          :class="activeButton === 'main' ? 'btn-clicked' : 'btn-unclicked'"
          @click="handleClick('main')"
        >
          재정요약
        </button>
        <button
          :class="activeButton === 'history' ? 'btn-clicked' : 'btn-unclicked'"
          @click="handleClick('history')"
        >
          거래내역조회
        </button>
        <button
          :class="activeButton === 'myPage' ? 'btn-clicked' : 'btn-unclicked'"
          @click="handleClick('myPage')"
        >
          마이페이지
        </button>
        <button class="btn-logout" @click="logout">로그아웃</button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/*---nav아웃라인---*/
#nav {
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
/*---nav아웃라인 END---*/

/*---nav바 프로필사진(사용자)---*/
.nav-bar-profile {
  width: calc(var(--space-m) * 7);
  height: calc(var(--space-m) * 7);
  margin-top: var(--space-l);
  border-radius: 50%;
  overflow: hidden;
}
.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-bar-profile img {
  width: 100%;
  margin-bottom: var(--space-m);
}
.nav-bar-userName {
  display: block;
  color: var(--color-black);
  font-size: var(--font-l);
}

/*---nav바 프로필사진(사용자)END---*/

/*---nav버튼박스(재정요약/거래내역조회/마이페이지/로그아웃)---*/
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
.btn-logout {
  background-color: var(--color-white);
  color: var(--color-purple9);
}
/*---nav버튼박스(재정요약/거래내역조회/마이페이지/로그아웃)END---*/
</style>
