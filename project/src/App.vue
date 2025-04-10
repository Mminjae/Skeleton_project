<template>
  <div class="app-container">
<<<<<<< HEAD
=======
    <!-- <TheSidebarLogin /> -->
>>>>>>> ff0fe1d2af24386723fe46eca1cabe6caa7c5a0e
    <TheSidebar />
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
<<<<<<< HEAD
import ViewMainLoginOut from './views/ViewMainLoginOut.vue'
=======
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
>>>>>>> ff0fe1d2af24386723fe46eca1cabe6caa7c5a0e
import TheSidebar from '@/layouts/TheSidebar.vue'
import ModalAddPost from './components/modal/ModalAddPost.vue'
import ModalEditPost from './components/modal/ModalEditPost.vue'
import ModalExpenditure from '@/components/modal/ModalExpenditure.vue'
import ModalImport from '@/components/modal/ModalImport.vue'
import ModalFilter from './components/modal/ModalFilter.vue'

export default {
  name: 'App',
<<<<<<< HEAD
  components: {
    ViewMainLoginOut,
    TheSidebar,
    ModalAddPost,
    ModalEditPost,
    ModalExpenditure,
    ModalImport,
    ModalFilter,
  },
=======
  components: { TheSidebar, TheSidebarLogin, ModalAddPost, ModalEditPost, ModalExpenditure, ModalImport, ModalFilter },
>>>>>>> ff0fe1d2af24386723fe46eca1cabe6caa7c5a0e
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
