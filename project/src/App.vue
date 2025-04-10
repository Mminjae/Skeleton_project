<template>
  <div class="app-container">
    <TheSidebarLogin />
<<<<<<< HEAD
    <TheSidebar />
=======
    <!-- <TheSidebar /> -->
>>>>>>> 7b303a6edc41a1015df0b3dbc7ac0b2291e05ee1
    <RouterView />
    <ViewMainLoginOut />
  </div>
  <ModalAddPost />
  <ModalEditPost />
  <ModalExpenditure />
  <ModalImport />
  <ModalFilter />
</template>
<script>
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
import TheSidebar from '@/layouts/TheSidebar.vue'
import ModalAddPost from './components/modal/ModalAddPost.vue'
import ModalEditPost from './components/modal/ModalEditPost.vue'
import ModalExpenditure from '@/components/modal/ModalExpenditure.vue'
import ModalImport from '@/components/modal/ModalImport.vue'
import ModalFilter from './components/modal/ModalFilter.vue'

export default {
  name: 'App',
  components: {
    TheSidebar,
    TheSidebarLogin,
    ModalAddPost,
    ModalEditPost,
    ModalExpenditure,
    ModalImport,
    ModalFilter,
  },
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
