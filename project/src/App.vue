<template>
  <div class="app-container">
    <!-- 로그인 상태에 따라 사이드바 및 메인 화면 구성 -->
    <TheSidebar v-if="!isLogin" />
    <TheSidebarLogin v-else />

    <RouterView />

    <ViewMainLoginOut v-if="!isLogin" />
    <ViewMainLogin v-else />
  </div>

  <!-- 모달 컴포넌트들 -->
  <ModalAddPost />
  <ModalEditPost />
  <ModalExpenditure />
  <ModalImport />
  <ModalFilter />
  <ModalIdpw v-if="showModalIdpw" @found-user="handleFoundUser" @close="showModalIdpw = false" />

  <ModalResultid
    v-if="showModalResultid"
    :found-id="foundUser.userId"
    @close="showModalResultid = false"
  />
  <ModalResetpw v-if="showModalResetpw" :user="foundUser" @close="showModalResetpw = false" />
</template>

<script setup>
import { ref, provide } from 'vue'
import TheSidebar from '@/layouts/TheSidebar.vue'
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
import ViewMainLoginOut from '@/views/ViewMainLoginOut.vue'
import ViewMainLogin from '@/views/ViewMainLogin.vue'
import ModalAddPost from './components/modal/ModalAddPost.vue'
import ModalEditPost from './components/modal/ModalEditPost.vue'
import ModalExpenditure from '@/components/modal/ModalExpenditure.vue'
import ModalImport from '@/components/modal/ModalImport.vue'
import ModalFilter from './components/modal/ModalFilter.vue'
import ModalIdpw from '@/components/modal/ModalIdpw.vue'
import ModalResultid from '@/components/modal/ModalResultid.vue'
import ModalResetpw from '@/components/modal/ModalResetpw.vue'
// 로그인 상태 전역관리 (초기 false)
const isLogin = ref(false)
provide('isLogin', isLogin) // 하위 컴포넌트에 제공

// 로그인 성공 시 실행될 함수
function handleLoginSuccess() {
  isLogin.value = true
}
//ID 찾기 함수

const foundId = ref('')
const showModalIdpw = ref(true)
const showModalResultid = ref(false)
const showModalResetpw = ref(false)
const foundUser = ref(null)
// ModalIdpw에서 ID를 찾았을 때
function openResultModal(id) {
  foundId.value = id
  showModalIdpw.value = false
  showModalResultid.value = true
}
function handleFoundUser(user) {
  foundUser.value = user

  // 모드에 따라 보여줄 모달 결정
  if (user.userId) {
    // ID 찾기일 때
    showModalResultid.value = true
  } else {
    // PW 찾기일 때
    showModalResetpw.value = true
  }

  // ModalIdpw 닫기
  showModalIdpw.value = false
  if (user.mode === 'pw') {
    showModalResetpw.value = true
  }

  showModalIdpw.value = false
}
</script>
<style scoped>
.app-container {
  display: flex;
  flex-direction: row; /*수평 정렬*/
  align-items: flex-start;
  height: 100vh;
}
</style>
