<template>
  <ModalFilter/>  
  <ModalAddPost />
  <ModalEditPost />
  <ModalExpenditure />
  <ModalImport />
  <!-- <TheSidebarLogin/> -->
  <!-- <ModalAddPost/> -->
  <!-- <TheSidebar /> -->
  <!-- <RouterView /> -->
</template>

<script>
import ModalFilter from './components/modal/ModalFilter.vue'
import ModalAddPost from './components/modal/ModalAddPost.vue'
import ModalEditPost from './components/modal/ModalEditPost.vue'
import ModalExpenditure from '@/components/modal/ModalExpenditure.vue'
import ModalImport from '@/components/modal/ModalImport.vue'

// import TheSidebar from '@/layouts/TheSidebar.vue'
// import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
export default {
  name: 'App',
  components: { ModalAddPost, ModalEditPost, ModalExpenditure, ModalImport, ModalFilter },

}
</script>
