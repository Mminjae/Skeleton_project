<template>
  <TheSidebar />
  <router-view />
</template>
<script>
import TheSidebar from '@/layouts/TheSidebar.vue'
export default {
  name: 'App',
  components: { TheSidebar },
}
</script>
