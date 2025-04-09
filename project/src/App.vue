<template>
  <ModalFilter/>
  <!-- <TheSidebar /> -->
  <!-- <ModalDetailPost /> -->
  <!-- <TheSidebarLogin/> -->
   <ModalAddPost/>
  <RouterView />
</template>
<script>
import TheSidebar from '@/layouts/TheSidebar.vue'
import ModalDetailPost from '@/components/modal/ModalDetailPost.vue'
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
import ModalFilter from './components/modal/ModalFilter.vue'
import ModalAddPost from './components/modal/ModalAddPost.vue'
export default {
  name: 'App',
  components: { TheSidebar, ModalDetailPost, ModalAddPost, ModalFilter, TheSidebarLogin },
}
</script>
