<script setup>
import { ref } from 'vue';

let currentPath = ref('/login');
</script>

<template>
  <div :class="navClass">
    <nav id="nav">
      <h1><RouterLink to="/main"><img src="../assets/imgs/logo.png" alt="사이트로고" /></RouterLink></h1>

      <div class="nav-bar-profile">
        <img src="../assets/imgs/user.png" alt="사용자프로필" />
        <span class="nav-bar-userName">000님</span>
      </div>
      <div class="nav-bar-btnbox">
        <router-link class="nav-link" to="/main">
          <button class="nav-bar-btn" @click="currentPath = '/main'">재정요약</button>
        </router-link>
        <router-link class="nav-link" to="/history">
          <button class="nav-bar-btn" @click="currentPath = '/history'">거래내역조회</button>
        </router-link>
        <router-link class="nav-link" to="/myPage">
          <button class="nav-bar-btn" @click="currentPath = '/myPage'">마이페이지</button>
        </router-link>
        <router-link class="nav-link" to="/">
          <button class="nav-bar-btn logout" @click="currentPath = '/'">로그아웃</button>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/*---nav아웃라인---*/

#nav {
  position: relative;
  display: flex; /* 1.레이아웃 */
  flex-direction: column;

  width: 18.75rem; /* 2.BOX */
  height: 100vh;

  background-color: var(--color-purple); /* 3.배경 */
}
/*---nav아웃라인END---*/
#nav,
#nav > * {
  align-items: center;
  text-align: center;
}
h1 {
  margin-top: 2.5rem;
}
h1 img {
  width: 10rem;
  height: 10rem;
}
/*---nav아웃라인 END---*/

/*---nav바 프로필사진(사용자)---*/
.nav-bar-profile {
  width: 10rem;
  height: 10rem;
  margin-top: 2rem;
  margin-bottom: 8.875rem;
}
.nav-bar-userName {
  display: block;
  line-height: 44px;
  color: var(--color-black);
  font-size: var(--font-l);
}
/*---nav바 프로필사진(사용자)END---*/

/*---nav버튼박스(재정요약/거래내역조회/마이페이지/로그아웃)---*/
#nav .nav-bar-btnbox {
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 3.875rem;
  bottom: 5%;
}
.nav-bar-btn {
  background-color: var(--color-purple);
  width: 13.125rem; /* 210px */
  height: 4.25rem; /* 68px */
  border-radius: 1.875rem; /* 30px */
  border: none;
  padding: 0 2.5rem; /* 40px */
  margin-bottom: 1.2rem;
  align-items: center;
  font-size: var(--font-base);
  color: var(--color-black);
}
.nav-bar-btn:hover {
  background-color: var(--color-purple9);
  color: var(--color-white);
}
.logout {
  background-color: var(--color-white);
  color: var(--color-purple9);
}
/*---nav버튼박스(재정요약/거래내역조회/마이페이지/로그아웃)END---*/
</style>
