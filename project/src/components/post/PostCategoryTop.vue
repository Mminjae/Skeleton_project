<template>
  <div class="wrapper">
    <h2 class="title">카테고리별 지출 TOP 3</h2>
    <hr />
    <ul class="list">
      <li v-for="(item, index) in top3" :key="index" class="list-item">
        <div class="left">
          <span class="rank">{{ index + 1 }}</span>
          <span class="icon"><ExpenseIcons :icon="item.name" /></span>
          <span class="name">{{ item.name }}</span>
        </div>
        <span class="amount">{{ formatAmount(item.amount) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ExpenseIcons from '../base/ExpenseIcons.vue'

const top3 = ref([
  { name: 'foodcost', amount: 150000 },
  { name: 'shopping', amount: 3000000 },
  { name: 'miscExpense', amount: 420000 },
])

// const icon = {
//   식비: '🥑',
//   쇼핑: '🍸',
//   기타: '💡',
// }

const formatAmount = (amount) => {
  return amount.toLocaleString() + '원'
}
</script>

<style scoped>
.wrapper {
  width: 31.875rem; /* 510px */
  height: 28.125rem; /* 450px */
  margin: 0 auto;
  padding: 1rem;
}

.title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rank {
  font-weight: bold;
}

.icon {
  font-size: 1.25rem;
}

.name {
  font-size: 1rem;
}

.amount {
  font-weight: bold;
  font-size: 1rem;
}
</style>
