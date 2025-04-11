<script setup>

import PostItem from '@/components/post/PostItem.vue';
// import ExpenseIcons from '@/components/base/ExpenseIcons.vue';
// import IncomeIcon from '@/components/base/IncomeIcon.vue';
import IconIcon from '@/components/base/iconIcon.vue';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
//리스트 컴포넌트에서 Store 사용하도록 수정
import { useTransactionStore } from '@/stores/useTransactionStore';
const transactionStore = useTransactionStore();
// const pageNumber


const itemsPerPage = 10; // 한 페이지당 10개
let currentPage = ref(1);
let pageCount = ref(0);
// const transactions = ref([]); //json.server에서 불러올 리스트 초기값 설정
const transactions = computed(() => transactionStore.transactions); //이제 store에서 불러온다.
const maxPage = computed(() => Math.ceil(transactions.value.length / itemsPerPage)); //transactions의 데이터 개수(길이)를 기반으로 동적으로 변경

//페이지별 리스트계산 - 우리는 한페이지당 10개의 리스트
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return transactions.value.slice(start, end);
});


//JSON Server에서 데이터 불러오기
// const fetchTransactions = async () => {
//   try {
//     const res = await axios.get('http://localhost:3000/transactions');
//     transactions.value = res.data;
//   } catch (error) {
//     console.error('데이터 가져오기 실패:', error);
//   }
// };
onMounted(() => {
  transactionStore.fetchTransactions(); // 초기에 전체 데이터 가져오기
});

</script>

<template>
  <div class="viewtransactionhistory">
    <h2>거래내역조회</h2>
    <!-- <button class="filter"><img src="../assets/imgs/icons_layout/filter.svg" alt="filter"></button> -->
    <button class="filter"><IconIcon icon="filter" scale="1.5"/></button>
    <button class="write"><IconIcon icon="write" scale="1.5"/></button>
    <hr>

    <ul class="list" >
      <PostItem
        v-for="item in paginatedList"
        :key="item.id"
        :item="item"
      />
    </ul>

    <div class="pagination">
      <button class="button--front" @click="pageCount = 0; currentPage = 1;">
        <img src="../assets/imgs/icons_layout/move_front.svg" alt="front">
      </button>
      <button class="button--previous" @click="pageCount >= 5 ? pageCount -= 5 : pageCount; currentPage = pageCount + 5;">
        <img src="../assets/imgs/icons_layout/move_previous.svg" alt="previous">
      </button>

      <button
        v-for="n in 5" :key="n"
        @click="currentPage = n + pageCount"
        :class="{ hidden: n + pageCount > maxPage }">
        <span :class="{ activePage: currentPage === n + pageCount }">{{ n + pageCount }}</span>
      </button>

      <button class="button--next" @click="pageCount + 5 < maxPage ? pageCount += 5 : pageCount; currentPage = pageCount + 1;">
        <img src="../assets/imgs/icons_layout/move_next.svg" alt="next">
      </button>
      <button class="button--rear" @click="pageCount = Math.floor((maxPage - 1) / 5) * 5; currentPage = maxPage"><img src="../assets/imgs/icons_layout/move_rear.svg" alt="rear"></button>
    </div>
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
  padding: var(--space-xl) 0 var(--space-xl) 2.5rem;
  color: var(--color-black);
}
button {
  border: none;
  background-color: transparent;
}
img {
  width: 40px;
  height: 40px;
}
hr {
  border: 2px solid var(--color-gray-light);
  width: 95%;
  margin: var(--space-md) 2.5%;
}

.list {
  list-style: none;
  padding: 0 5.5rem;
}
.list > li {
  border-bottom: 2px solid var(--color-gray-light);
}
.list > li:last-child {
  border-bottom: none;
}

.filter {
  padding-left: 4rem;
}
.write {
  position: absolute;
  right: 0;
  padding-right: 4rem;
}

.pagination {
  position: absolute;
  bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
  padding: var(--space-md) 0;
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