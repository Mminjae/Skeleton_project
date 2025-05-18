<template>
  <div class="app-container">
    <TheSidebar v-if="!isLogin" />
    <TheSidebarLogin />
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" />
      <ViewMainLoginOut v-if="!isLogin && route.path === '/'" />
      <ViewMainLogin v-if="isLogin && route.path === '/'" />
    </RouterView>
  </div>
  <ModalAddPost />
  <ModalImport />
 
  <ModalResultid v-if="showModalResult" :found-id="foundId" @close="showModalResult = false" />
</template>

<script setup>
import { ref, provide } from 'vue'

import TheSidebar from '@/layouts/TheSidebar.vue'
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
// import ViewMainLoginOut from '@/views/ViewMainLoginOut.vue'
import ViewMainLogin from '@/views/ViewMainLogin.vue'
import ModalAddPost from './components/modal/ModalAddPost.vue'
import ModalImport from '@/components/modal/ModalImport.vue'
import ModalResultid from '@/components/modal/ModalResultid.vue'
// 로그인 상태 전역관리 (초기 false)
const isLogin = ref(false)
provide('isLogin', isLogin) // 하위 컴포넌트에 제공

// 로그인 성공 시 실행될 함수
function handleLoginSuccess() {
  isLogin.value = true
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
