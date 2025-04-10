<template>
  <div>
    <h2>최근 거래 내역</h2>
    <button>플러스</button>
    <hr />
    <ul>
      <li v-for="(history, index) in recentHistory" :key="index">
        <span>{{ icon[history.category] }}</span>
        <span>{{ history.title }}</span>
        <span>{{ history.date }}</span>
        <span>{{ history.amount }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentHistory = ref([
  {
    category: '식비',
    title: '스타벅스 커피',
    date: '2025-04-08',
    amount: 5800,
  },
  {
    category: '쇼핑',
    title: '무신사 바지 구매',
    date: '2025-04-06',
    amount: 87000,
  },
  {
    category: '교통',
    title: '지하철 정기권',
    date: '2025-04-01',
    amount: 65000,
  },
  {
    category: '기타',
    title: '넷플릭스 구독료',
    date: '2025-04-03',
    amount: 13500,
  },
  {
    category: '주거',
    title: '월세 납부',
    date: '2025-04-05',
    amount: 500000,
  },
])

const icon = {
  // 컴포넌트 사용 예정
  식비: '🥑',
  쇼핑: '🛍️',
  교통: '🚇',
  기타: '💡',
  주거: '🏠',
}
</script>

<style scoped></style>
