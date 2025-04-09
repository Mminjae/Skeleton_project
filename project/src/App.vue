<template>
  <ModalAddPost />
  <ModalEditPost />
  <ModalExpenditure />
  <ModalImport />

  <!-- <TheSidebar /> -->
  <!-- <RouterView /> -->
</template>

<script>
import ModalAddPost from './components/modal/ModalAddPost.vue'
import ModalEditPost from './components/modal/ModalEditPost.vue'
import ModalExpenditure from '@/components/modal/ModalExpenditure.vue'
import ModalImport from '@/components/modal/ModalImport.vue'

// import TheSidebar from '@/layouts/TheSidebar.vue'
export default {
  name: 'App',
  components: { ModalAddPost, ModalEditPost, ModalExpenditure, ModalImport },
}
</script>
