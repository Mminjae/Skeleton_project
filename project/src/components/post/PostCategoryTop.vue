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
import { ref, computed, onMounted } from 'vue'
import ExpenseIcons from '../base/ExpenseIcons.vue'
import { useFinancialSummaryStore } from '@/stores/useFinancialSummaryStore'
import { storeToRefs } from 'pinia'

const store = useFinancialSummaryStore()
const { bestCategory } = storeToRefs(store)

onMounted(() => {
  store.fetchData()
})

const top3 = computed(() => {
  return bestCategory.value.map((item) => ({
    name: item.category,
    amount: item.amount,
  }))
})

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

.wrapper {
  width: 31.875rem; /* 510px */
  height: 28.125rem; /* 450px */
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.list {
  flex: 1; /* 남은 높이 꽉 채우기 */
  display: flex;
  flex-direction: column;
}

.list-item {
  flex: 1; /* 전체 높이에서 균등 분배 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem; /* 좌우 여백만 */
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
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
