<template>
<<<<<<< HEAD
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
=======
  <TheSidebar />
  <ModalDetailPost />
  <RouterView />
</template>
<script>
import TheSidebar from '@/layouts/TheSidebar.vue'
import ModalDetailPost from '@/components/modal/ModalDetailPost.vue'
export default {
  name: 'App',
  components: { TheSidebar, ModalDetailPost },
>>>>>>> f0c1eb5ce06950f390d8e6836d57c96cffc59c52
}
</script>
