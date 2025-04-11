<template>
  <div class="history-container">
    <div class="header">
      <h2 class="title">최근 거래 내역</h2>
      <button class="plus-button">+</button>
    </div>
    <hr />
    <ul class="history-list">
      <li v-for="(history, index) in recentHistory" :key="index" class="history-item">
        <span class="icon">{{ icon[history.category] }}</span>
        <div class="details">
          <span class="item-title">{{ history.title }}</span>
          <span class="date">{{ history.date }}</span>
        </div>
        <span class="amount">{{ history.amount.toLocaleString() }}원</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentHistory = ref([
  { category: '식비', title: '스타벅스 커피', date: '2025-04-08', amount: 5800 },
  { category: '쇼핑', title: '무신사 바지 구매', date: '2025-04-06', amount: 87000 },
  { category: '교통', title: '지하철 정기권', date: '2025-04-01', amount: 65000 },
  { category: '기타', title: '넷플릭스 구독료', date: '2025-04-03', amount: 13500 },
  { category: '주거', title: '월세 납부', date: '2025-04-05', amount: 500000 },
])

const icon = {
  식비: '🥑',
  쇼핑: '🛍️',
  교통: '🚇',
  기타: '💡',
  주거: '🏠',
}
</script>

<style scoped>
.history-container {
  width: 30rem;
  height: 28.125rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.header {
  position: relative;
  text-align: center;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
}

.plus-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #5d45db;
  border: none;
  padding: 0.25rem 0.8rem;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
  width: 2rem;
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.date {
  font-size: 0.75rem;
  color: #9ca3af;
}

.amount {
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
}
</style>