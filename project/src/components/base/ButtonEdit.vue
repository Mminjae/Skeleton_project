<template>
  <div class="btn-group">
    <button class="edit btn btn-light" @click="goEdit">수정</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goEdit = () => {
  router.push('/profileEdit')
}
</script>

<style scoped>
.edit {
  width: 5rem;
  margin-right: 1rem;
}
</style>
