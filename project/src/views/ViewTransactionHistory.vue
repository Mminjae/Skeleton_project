<script setup>

import PostItem from '@/components/post/PostItem.vue';
import { ref, computed } from 'vue';

// const pageNumber

const list = [
  {
    id: 1,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "월급", // 카테고리
    type: "income", // 수입(income), 지출(expense)
    merchant: "입금", // 내역
    memo: "알바비", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "", // 결제수단
  },
  {
    id: 2,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "식비", // 카테고리
    type: "expense", // 수입(income), 지출(expense)
    merchant: "하이디라오", // 내역
    memo: "", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "카드", // 결제수단
  },
  {
    id: 3,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "쇼핑", // 카테고리
    type: "expense", // 수입(income), 지출(expense)
    merchant: "무신사", // 내역
    memo: "", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "현금", // 결제수단
  },
  {
    id: 4,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "월급", // 카테고리
    type: "income", // 수입(income), 지출(expense)
    merchant: "입금", // 내역
    memo: "알바비", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "", // 결제수단
  },
  {
    id: 5,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "월급", // 카테고리
    type: "income", // 수입(income), 지출(expense)
    merchant: "입금", // 내역
    memo: "", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "", // 결제수단
  },
  {
    id: 6,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "월급", // 카테고리
    type: "income", // 수입(income), 지출(expense)
    merchant: "입금", // 내역
    memo: "알바비", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "", // 결제수단
  },
  {
    id: 7,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "월급", // 카테고리
    type: "income", // 수입(income), 지출(expense)
    merchant: "입금", // 내역
    memo: "알바비", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "", // 결제수단
  },
  {
    id: 8,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "월급", // 카테고리
    type: "income", // 수입(income), 지출(expense)
    merchant: "입금", // 내역
    memo: "알바비", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "", // 결제수단
  },
  {
    id: 9,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "월급", // 카테고리
    type: "income", // 수입(income), 지출(expense)
    merchant: "입금", // 내역
    memo: "", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "", // 결제수단
  },
  {
    id: 10,
    date: "2024-11-11", // 날짜
    amount: 1885626,  // 금액
    category: "월급", // 카테고리
    type: "income", // 수입(income), 지출(expense)
    merchant: "입금", // 내역
    memo: "알바비", // 메모
    userId: "hana11", // 유저 데이터
    paymentMethod: "", // 결제수단
  },
]

let currentPage = ref(1);
let pageCount = ref(0);
let maxPage = ref(21);

</script>

<template>
  <div class="viewtransactionhistory">
    <h2>거래내역조회</h2>
    <button class="filter"><img src="../assets/imgs/icons_layout/filter.svg" alt="filter"></button>
    <button class="write"><img src="../assets/imgs/icons_layout/write.svg" alt="write"></button>
    <hr>

    <ul class="list" >
      <PostItem
        v-for="item in list"
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
  height: 100vh;
}
h2 {
  padding: var(--space-xl) 0 var(--space-xl) 2.5rem;
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