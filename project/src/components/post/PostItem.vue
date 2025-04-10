<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('ko-KR', options);
}
</script>

<template>
  <li>
    <button class="item">
      <p class="date color--gray">{{ formatDate(item.date) }}</p>
      <div class="category">
        <img src="../../assets/imgs/icons_layout/memo.svg" alt="memo">
        <p class="color--black">{{ item.category }}</p>
      </div>
      <p class="description color--black">{{ item.merchant }}</p>
      <div class="payment">
        <p class="color--gray">{{ item.paymentMethod }}</p>
        <span>
          <p :class="item.type === 'income' ? 'color--black color--blue' : 'color--black color--red'">
            {{ item.type === 'income' ? '+' : '-' }}
            {{ item.amount }}</p>
          <p>원</p>
        </span>
      </div >
      <div class="memo">
        <img v-if="item.memo" src="../../assets/imgs/icons_layout/memo.svg" alt="memo">
      </div>
    </button>
  </li>
</template>

<style scoped>
.color--gray {
  color: var(--color-gray-medium);
}
.color--black {
  color: var(--color-black);
}
.color--red {
  color: var(--color-red);
}
.color--blue {
  color: var(--color-blue);
}

.item {
  background: none;
  border: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-md);
}
.item p {
  display: inline-block;
}
.item * {
  margin: 0;
}

.date {
  text-align: left;
  width: 7.5rem;
}

.category {
  display: flex;
  gap: var(--space-md);
  width: 10rem;
}

.description {
  text-align: left;
  width: 25rem;
}

.payment {
  display: flex;
  justify-content: space-between;
  width: 10rem;
}

.memo,
.memo img {
  text-align: right;
  width: var(--space-lg);
  height: var(--space-lg);
}
</style>