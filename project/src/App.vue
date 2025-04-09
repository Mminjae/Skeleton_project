<template>
  <!-- <TheSidebar /> -->
  <!-- <ModalDetailPost /> -->
  <div class="app-container">
    <TheSidebarLogin />
    <RouterView />
  </div>
</template>
<script>
import TheSidebar from '@/layouts/TheSidebar.vue'
import ModalDetailPost from '@/components/modal/ModalDetailPost.vue'
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
export default {
  name: 'App',
  components: { TheSidebar, ModalDetailPost, TheSidebarLogin },
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
