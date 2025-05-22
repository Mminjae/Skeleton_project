<template>
  <div class="app-container">
    <TheSidebar v-if="!loginStore.isLoggedIn" />
    <TheSidebarLogin v-else />

    <div class="main-view">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </div>
  </div>

  <ModalAddPost />
  <ModalImport />
  <ModalResultid v-if="showModalResult" :found-id="foundId" @close="showModalResult = false" />
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useLoginStore } from '@/stores/useLoginStore'

import TheSidebar from '@/layouts/TheSidebar.vue'
import TheSidebarLogin from '@/layouts/TheSidebarLogin.vue'

import ModalAddPost from '@/components/modal/ModalAddPost.vue'
import ModalImport from '@/components/modal/ModalImport.vue'
import ModalResultid from '@/components/modal/ModalResultid.vue'

const loginStore = useLoginStore()

const showModalResult = ref(false)
const foundId = ref('')
onMounted(async () => {
  await loginStore.init()
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
}
.main-view {
  flex-grow: 1;
  overflow: auto;
}
</style>
