<template>
  <div class="history-container">
    <div class="header">
      <h2 class="title">최근 거래 내역</h2>
      <button class="plus-button" data-bs-toggle="modal" data-bs-target="#ModalAddPost">+</button>
    </div>
    <hr />

    <ul class="history-list">
      <li v-for="(history, index) in recentHistory" :key="index" class="history-item">
        <span class="icon"><ExpenseIcons :icon="history.category" /></span>
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
import { computed, onMounted, ref } from 'vue'
import { useFinancialSummaryStore } from '@/stores/useFinancialSummaryStore'
import { storeToRefs } from 'pinia'
import ExpenseIcons from '../base/ExpenseIcons.vue'
import ModalAddPost from '../modal/ModalAddPost.vue'

const store = useFinancialSummaryStore()
const { recentData } = storeToRefs(store)

onMounted(() => {
  store.fetchData(1)
})

const recentHistory = computed(() => {
  return recentData.value.map((item) => ({
    category: item.category,
    title: item.merchant,
    date: item.date,
    amount: item.amount,
  }))
})

// 모달 열기 함수
function onOpenImport(item) {
  selectedItem.value = item // 클릭한 거래 데이터를 저장
  showModalImport.value = true // 모달 컴포넌트 마운트 트리거
  nextTick(() => {
    // 렌더링이 끝난 뒤에 실제 DOM 엘리먼트를 찾아서 부트스트랩 모달 호출
    const modalEl = document.getElementById('ModalImport')
    if (modalEl) {
      new Modal(modalEl).show()
    }
  })
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
