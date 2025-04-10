<template>
  <div class="app-container">
    <TheSidebarLogin />
    <RouterView />
  </div>
  <ModalAddPost />
  <ModalEditPost />
  <ModalExpenditure />
  <ModalImport />
</template>
<script>
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'

import ModalAddPost from './components/modal/ModalAddPost.vue'
import ModalEditPost from './components/modal/ModalEditPost.vue'
import ModalExpenditure from '@/components/modal/ModalExpenditure.vue'
import ModalImport from '@/components/modal/ModalImport.vue'

export default {
  name: 'App',
  components: { TheSidebarLogin, ModalAddPost, ModalEditPost, ModalExpenditure, ModalImport },
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
