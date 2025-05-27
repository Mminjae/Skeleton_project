<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { Modal } from 'bootstrap'

import PostItem from '@/components/post/PostItem.vue'
import IconIcon from '@/components/base/iconIcon.vue'
import ModalAddPost from '@/components/modal/ModalAddPost.vue'
import ModalImport from '@/components/modal/ModalImport.vue'
import ModalFilter from '@/components/modal/ModalFilter.vue'

import { useTransactionStore } from '@/stores/useTransactionStore'
const transactionStore = useTransactionStore()

const selectedItem = ref(null)
const showModalImport = ref(false)

const itemsPerPage = 10
const currentPage = ref(1)
const pageCount = ref(0)
const transactions = computed(() => transactionStore.transactions)
const maxPage = computed(() => Math.ceil(transactions.value.length / itemsPerPage))

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return transactions.value.slice(start, start + itemsPerPage)
})

function onOpenImport(item) {
  selectedItem.value = item
  showModalImport.value = true
  nextTick(() => {
    const modalEl = document.getElementById('ModalImport')
    if (modalEl) new Modal(modalEl).show()
  })
}

const goToFirstPage = () => {
  pageCount.value = 0
  currentPage.value = 1
}
const goToPreviousGroup = () => {
  if (pageCount.value >= 5) pageCount.value -= 5
  currentPage.value = pageCount.value + 5
}
const goToNextGroup = () => {
  if (pageCount.value + 5 < maxPage.value) pageCount.value += 5
  currentPage.value = pageCount.value + 1
}
const goToLastPage = () => {
  pageCount.value = Math.floor((maxPage.value - 1) / 5) * 5
  currentPage.value = maxPage.value
}

// 거래 추가/수정/삭제 후 목록 갱신
const onTransactionChanged = async () => {
  await transactionStore.fetchTransactions()
}

// 거래내역 초기 로딩
onMounted(() => {
  transactionStore.fetchTransactions()
})
</script>

<template>
  <div class="viewtransactionhistory">
    <h2>거래내역조회</h2>

    <!-- 필터 모달 -->
    <ModalFilter @apply-filter="handleFilter" class="filter" />

    <!-- 글쓰기 버튼 -->
    <button class="write" type="button" data-bs-toggle="modal" data-bs-target="#ModalAddPost">
      <IconIcon icon="write" scale="1.3" />
    </button>

    <hr />

    <!-- 거래 항목 리스트 -->
    <ul class="list">
      <PostItem
        v-for="item in paginatedList"
        :key="item.id"
        :item="item"
        @open-import="onOpenImport"
      />
    </ul>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button class="button--front" @click="goToFirstPage">
        <IconIcon icon="front" />
      </button>
      <button class="button--previous" @click="goToPreviousGroup">
        <IconIcon icon="previous" />
      </button>

      <button
        v-for="n in 5"
        :key="n"
        @click="currentPage = n + pageCount"
        :class="{ hidden: n + pageCount > maxPage }"
      >
        <span :class="{ activePage: currentPage === n + pageCount }">
          {{ n + pageCount }}
        </span>
      </button>

      <button class="button--next" @click="goToNextGroup">
        <IconIcon icon="next" />
      </button>
      <button class="button--last" @click="goToLastPage">
        <IconIcon icon="last" />
      </button>
    </div>

    <!-- 추가 모달 -->
    <ModalAddPost @transaction-added="onTransactionChanged" />

    <!-- 수정/삭제 모달 -->
    <ModalImport
      v-if="showModalImport"
      :item="selectedItem"
      @close="showModalImport = false"
      @transaction-updated="onTransactionChanged"
      @transaction-deleted="onTransactionChanged"
    />
  </div>
</template>

<style scoped>
.viewtransactionhistory {
  position: relative;
  background-color: var(--color-white);
  color: var(--color-gray-black);
  width: 100%;
  height: 100vh;
}
h2 {
  padding: var(--space-l) 0 var(--space-s) calc(var(--space-m) * 2.5);
  color: var(--color-black);
  font-size: var(--font-xl);
}
button {
  border: none;
  background-color: transparent;
}
hr {
  border: 2px solid var(--color-gray-light);
  width: 95%;
  margin: var(--space-m) 2.5% 0 2.5%;
}
.list {
  list-style: none;
  padding: 0 calc(var(--space-m) * 4);
}
.list > li {
  border-bottom: 2px solid var(--color-gray-light);
}
.list > li:last-child {
  border-bottom: none;
}
.filter {
  padding-left: calc(var(--space-m) * 3);
}
.write {
  position: absolute;
  right: 0;
  padding-right: calc(var(--space-m) * 3.5);
}
.pagination {
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
  padding: var(--space-m) 0;
  width: 100%;
}
.activePage {
  color: var(--color-purple9);
  text-decoration: underline;
}
.hidden {
  display: none;
}
</style>
