<template>
  <ModalFilter/>
  <!-- <TheSidebar /> -->
  <!-- <ModalDetailPost /> -->
  <!-- <TheSidebarLogin/> -->
  <RouterView />
</template>
<script>
import TheSidebar from '@/layouts/TheSidebar.vue'
import ModalDetailPost from '@/components/modal/ModalDetailPost.vue'
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
import ModalFilter from './components/modal/ModalFilter.vue'
export default {
  name: 'App',
  components: { TheSidebar, ModalDetailPost, ModalFilter, TheSidebarLogin },
}
</script>
