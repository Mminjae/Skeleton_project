<script setup>
import CategoryInfo from '../base/CategoryInfo.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li class="post-item">
    <div class="item" @click="$emit('open-import', item)">
      <p class="date color--gray">
        {{ item.dateYear }}.{{ item.dateMonth }}.{{ item.dateDay }}({{ item.dayOfWeek }})
      </p>
      <div class="category">
        <CategoryInfo class="color--black" :category="item.category" :isIncome="item.isIncome" />
      </div>
      <p class="description color--black">{{ item.merchant }}</p>
      <div class="payment">
        <p class="color--gray">{{ item.paymentMethod }}</p>
        <span class="amount">
          <p :class="item.isIncome ? 'color--black color--blue' : 'color--black color--red'">
            {{ item.isIncome ? '+' : '-' }} {{ item.amount.toLocaleString() }}
          </p>
          <p>원</p>
        </span>
      </div>
      <div class="memo">
        <img v-if="item.memo" src="../../assets/imgs/icons_layout/memo.svg" alt="memo" />
      </div>
    </div>
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
.item * {
  margin: 0;
}
.item p {
  display: inline-block;
}
.item:hover {
  box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.1);
}
.item:hover * {
  transform: translate(-1px, -1px);
  transition: transform 0.2s ease;
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
.amount {
  display: flex;
  gap: var(--space-xs);
}

.memo,
.memo img {
  text-align: right;
  width: var(--space-lg);
  height: var(--space-lg);
}
</style>