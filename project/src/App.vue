<template>
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
}
</script>
