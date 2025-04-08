<template>
  <!-- <TheSidebar /> -->
   <TheSidebarLogin/>
  <router-view />
</template>
<script>
import TheSidebar from '@/layouts/TheSidebar.vue'
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'
export default {
  name: 'App',
  components: { TheSidebar,TheSidebarLogin },
}
</script>
