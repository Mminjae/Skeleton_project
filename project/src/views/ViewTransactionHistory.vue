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
const fetchTransactions = async () => {
  try {
    const res = await axios.get('http://localhost:3000/transactions');
    transactions.value = res.data;
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
  }
};
onMounted(() => {
  transactionStore.fetchTransactions(); // 초기에 전체 데이터 가져오기
});

</script>

<template>
  <div class="viewtransactionhistory">
    <h2>거래내역조회</h2>
    <button class="filter"><IconIcon icon="filter" scale="1.3"/></button>
    <button class="write"><IconIcon icon="write" scale="1.3"/></button>
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
          <svg width="20" height="14\8" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0136 0.306143C13.1169 0.402556 13.1989 0.517075 13.2548 0.643147C13.3107 0.769219 13.3395 0.904367 13.3395 1.04086C13.3395 1.17734 13.3107 1.31249 13.2548 1.43856C13.1989 1.56463 13.1169 1.67915 13.0136 1.77557L8.68894 5.81909L13.0136 9.86261C13.222 10.0575 13.339 10.3218 13.339 10.5973C13.339 10.8729 13.222 11.1372 13.0136 11.332C12.8051 11.5269 12.5225 11.6364 12.2278 11.6364C11.933 11.6364 11.6504 11.5269 11.442 11.332L6.32601 6.54859C6.22269 6.45218 6.14071 6.33766 6.08478 6.21159C6.02885 6.08552 6.00006 5.95037 6.00006 5.81388C6.00006 5.67739 6.02885 5.54224 6.08478 5.41617C6.14071 5.2901 6.22269 5.17558 6.32601 5.07917L11.442 0.295721C11.8655 -0.100294 12.5789 -0.100294 13.0136 0.306143Z" fill="#959595" fill-opacity="0.73"/>
            <path d="M7.01349 0.306143C7.11682 0.402556 7.19879 0.517075 7.25473 0.643147C7.31066 0.769219 7.33945 0.904367 7.33945 1.04086C7.33945 1.17734 7.31066 1.31249 7.25473 1.43856C7.19879 1.56463 7.11682 1.67915 7.01349 1.77557L2.68888 5.81909L7.01349 9.86261C7.2219 10.0575 7.33898 10.3218 7.33898 10.5973C7.33898 10.8729 7.2219 11.1372 7.01349 11.332C6.80509 11.5269 6.52243 11.6364 6.22771 11.6364C5.93298 11.6364 5.65032 11.5269 5.44192 11.332L0.325952 6.54859C0.222626 6.45218 0.14065 6.33766 0.0847187 6.21159C0.0287867 6.08552 -2.38419e-06 5.95037 -2.38419e-06 5.81388C-2.38419e-06 5.67739 0.0287867 5.54224 0.0847187 5.41617C0.14065 5.2901 0.222626 5.17558 0.325952 5.07917L5.44192 0.295721C5.86546 -0.100294 6.5788 -0.100294 7.01349 0.306143Z" fill="#959595" fill-opacity="0.73"/>
          </svg>
      </button>
      <button class="button--previous" @click="pageCount >= 5 ? pageCount -= 5 : pageCount; currentPage = pageCount + 5;">
        <svg width="14" height="18" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.01349 0.306143C7.11682 0.402556 7.19879 0.517075 7.25473 0.643147C7.31066 0.769219 7.33945 0.904367 7.33945 1.04086C7.33945 1.17734 7.31066 1.31249 7.25473 1.43856C7.19879 1.56463 7.11682 1.67915 7.01349 1.77557L2.68888 5.81909L7.01349 9.86261C7.2219 10.0575 7.33898 10.3218 7.33898 10.5973C7.33898 10.8729 7.2219 11.1372 7.01349 11.332C6.80509 11.5269 6.52243 11.6364 6.22771 11.6364C5.93298 11.6364 5.65032 11.5269 5.44192 11.332L0.325952 6.54859C0.222626 6.45218 0.14065 6.33766 0.0847187 6.21159C0.028787 6.08552 -2.38419e-06 5.95037 -2.38419e-06 5.81388C-2.38419e-06 5.67739 0.028787 5.54224 0.0847187 5.41617C0.14065 5.2901 0.222626 5.17558 0.325952 5.07917L5.44192 0.295721C5.86546 -0.100294 6.5788 -0.100294 7.01349 0.306143Z" fill="#959595" fill-opacity="0.73"/>
        </svg>
      </button>

      <button
        v-for="n in 5" :key="n"
        @click="currentPage = n + pageCount"
        :class="{ hidden: n + pageCount > maxPage }">
        <span :class="{ activePage: currentPage === n + pageCount }">{{ n + pageCount }}</span>
      </button>

      <button class="button--next" @click="pageCount + 5 < maxPage ? pageCount += 5 : pageCount; currentPage = pageCount + 1;">
        <svg width="14" height="18" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.325955 0.306143C0.222629 0.402556 0.140654 0.517076 0.0847218 0.643147C0.0287901 0.769219 0 0.904367 0 1.04086C0 1.17734 0.0287901 1.31249 0.0847218 1.43856C0.140654 1.56463 0.222629 1.67915 0.325955 1.77557L4.65056 5.81909L0.325955 9.86261C0.117552 10.0575 0.000471952 10.3218 0.000471952 10.5973C0.000471952 10.8729 0.117552 11.1372 0.325955 11.332C0.534359 11.5269 0.817014 11.6364 1.11174 11.6364C1.40647 11.6364 1.68912 11.5269 1.89753 11.332L7.0135 6.54859C7.11682 6.45218 7.1988 6.33766 7.25473 6.21159C7.31066 6.08552 7.33945 5.95037 7.33945 5.81388C7.33945 5.67739 7.31066 5.54224 7.25473 5.41617C7.1988 5.2901 7.11682 5.17558 7.0135 5.07917L1.89753 0.295721C1.47398 -0.100294 0.760646 -0.100294 0.325955 0.306143Z" fill="#959595" fill-opacity="0.73"/>
        </svg>
      </button>
      <button class="button--rear" @click="pageCount = Math.floor((maxPage - 1) / 5) * 5; currentPage = maxPage">
        <svg width="20" height="18" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.325955 0.306143C0.222629 0.402556 0.140654 0.517076 0.0847218 0.643147C0.0287901 0.769219 0 0.904367 0 1.04086C0 1.17734 0.0287901 1.31249 0.0847218 1.43856C0.140654 1.56463 0.222629 1.67915 0.325955 1.77557L4.65056 5.81909L0.325955 9.86261C0.117552 10.0575 0.000471952 10.3218 0.000471952 10.5973C0.000471952 10.8729 0.117552 11.1372 0.325955 11.332C0.534359 11.5269 0.817014 11.6364 1.11174 11.6364C1.40647 11.6364 1.68912 11.5269 1.89753 11.332L7.0135 6.54859C7.11682 6.45218 7.1988 6.33766 7.25473 6.21159C7.31066 6.08552 7.33945 5.95037 7.33945 5.81388C7.33945 5.67739 7.31066 5.54224 7.25473 5.41617C7.1988 5.2901 7.11682 5.17558 7.0135 5.07917L1.89753 0.295721C1.47398 -0.100294 0.760646 -0.100294 0.325955 0.306143Z" fill="#959595" fill-opacity="0.73"/>
          <path d="M6.32596 0.306143C6.22263 0.402556 6.14065 0.517076 6.08472 0.643147C6.02879 0.769219 6 0.904367 6 1.04086C6 1.17734 6.02879 1.31249 6.08472 1.43856C6.14065 1.56463 6.22263 1.67915 6.32596 1.77557L10.6506 5.81909L6.32596 9.86261C6.11755 10.0575 6.00047 10.3218 6.00047 10.5973C6.00047 10.8729 6.11755 11.1372 6.32596 11.332C6.53436 11.5269 6.81701 11.6364 7.11174 11.6364C7.40647 11.6364 7.68912 11.5269 7.89753 11.332L13.0135 6.54859C13.1168 6.45218 13.1988 6.33766 13.2547 6.21159C13.3107 6.08552 13.3394 5.95037 13.3394 5.81388C13.3394 5.67739 13.3107 5.54224 13.2547 5.41617C13.1988 5.2901 13.1168 5.17558 13.0135 5.07917L7.89753 0.295721C7.47398 -0.100294 6.76065 -0.100294 6.32596 0.306143Z" fill="#959595" fill-opacity="0.73"/>
        </svg>
      </button>
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