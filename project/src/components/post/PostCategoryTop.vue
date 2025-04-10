<template>
  <div>
    <h2>카테고리별 지출 TOP 3</h2>
    <hr />
    <ul>
      <li v-for="(item, index) in top3" :key="index">
        <span>{{ index + 1 }}</span>
        <span>{{ icon[item.name] }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.amount }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const top3 = ref([
  { name: '식비', amount: 150000 },
  { name: '쇼핑', amount: 3000000 },
  { name: '기타', amount: 420000 },
])

const icon = {
  식비: '🥑',
  쇼핑: '🍸',
  기타: '💡',
}
</script>

<style scoped></style>
