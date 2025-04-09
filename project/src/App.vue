<template>
  <!-- <TheSidebar /> -->
  <!-- <ModalDetailPost /> -->
  <TheSidebarLogin/>
  <RouterView />
</template>
<script>
import TheSidebar from '@/layouts/TheSidebar.vue'
import ModalDetailPost from '@/components/modal/ModalDetailPost.vue'
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
export default {
  name: 'App',
  components: { TheSidebar, ModalDetailPost,TheSidebarLogin },
}
</script>
