<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'

// 컴포넌트 import
import PostItem from '@/components/post/PostItem.vue'
import IconIcon from '@/components/base/iconIcon.vue'
import ModalAddPost from '@/components/modal/ModalAddPost.vue'
import ModalImport from '@/components/modal/ModalImport.vue'

// Pinia store 사용
import { useTransactionStore } from '@/stores/useTransactionStore'
const transactionStore = useTransactionStore()

// 상태 변수
const selectedItem    = ref(null)
const showModalImport = ref(false)   // ← 모달 표시 플래그 추가
const showModalAdd    = ref(false)   // (기존 코드)

// 모달 열기 함수
function onOpenImport(item) {
  selectedItem.value  = item      // 클릭한 거래 데이터를 저장
  showModalImport.value = true    // 모달 컴포넌트 마운트 트리거
  nextTick(() => {
    // 렌더링이 끝난 뒤에 실제 DOM 엘리먼트를 찾아서 부트스트랩 모달 호출
    const modalEl = document.getElementById('ModalImport')
    if (modalEl) {
      new Modal(modalEl).show()
    }
  })
}

// 페이징 관련
const itemsPerPage = 10
const currentPage  = ref(1)
const pageCount    = ref(0)

const transactions = computed(() => transactionStore.transactions)
const maxPage      = computed(() => Math.ceil(transactions.value.length / itemsPerPage))
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end   = start + itemsPerPage
  return transactions.value.slice(start, end)
})

// 초기 데이터 로딩
onMounted(() => {
  transactionStore.fetchTransactions()
})
</script>

<template>
  <div class="viewtransactionhistory">
    <h2>거래내역조회</h2>
    <hr>
    <button class="filter"><IconIcon icon="filter" scale="1.3"/></button>
    <button class="write" type="button" data-bs-toggle="modal" data-bs-target="#ModalAddPost">
      <IconIcon icon="write" scale="1.3" />
    </button>

    <hr />

    <ul class="list">
      <PostItem
        v-for="item in paginatedList"
        :key="item.id"
        :item="item"
        @open-import="onOpenImport"
      />
    </ul>

    <div class="pagination">
      <button class="button--front" @click="pageCount = 0; currentPage = 1;">
        <IconIcon icon="front"/>
      </button>
      <button class="button--previous" @click="pageCount >= 5 ? pageCount -= 5 : pageCount; currentPage = pageCount + 5;">
        <IconIcon icon="previous"/>
      </button>

      <button
        v-for="n in 5"
        :key="n"
        @click="currentPage = n + pageCount"
        :class="{ hidden: n + pageCount > maxPage }"
      >
        <span :class="{ activePage: currentPage === n + pageCount }">{{ n + pageCount }}</span>
      </button>

      <button class="button--next" @click="pageCount + 5 < maxPage ? pageCount += 5 : pageCount; currentPage = pageCount + 1;">
        <IconIcon icon="next"/>
      </button>
      <button class="button--last" @click="pageCount = Math.floor((maxPage - 1) / 5) * 5; currentPage = maxPage">
        <IconIcon icon="last"/>
      </button>
    </div>
  </div>
  <ModalAddPost v-if="showModalAdd" @close="showModalAdd = false" />

   <!-- 거래 상세보기 모달 -->
    <ModalImport
     v-if="showModalImport"
     :item="selectedItem"
     @close="showModalImport = false"
   />
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
