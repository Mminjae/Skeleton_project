<script setup>
import CategoryInfo from '../base/CategoryInfo.vue';
import IconIcon from '@/components/base/iconIcon.vue';

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
      </div >
      <div class="memo">
        <IconIcon v-if="item.memo" icon="memo"/>
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
  padding: calc(var(--space-l) / 2);
}
.item * {
  margin: 0;
}
.item p {
  display: inline-block;
  font-size: 0.95rem;
}
.item:hover {
  box-shadow: 0 10px 6px -6px rgba(0, 0, 0, 0.1);
}
.item:hover > * {
  transform: translate(-1.5px, -1.5px);
  transition: transform 0.2s ease;
}

.date {
  text-align: left;
  width: 7.5rem;
}

.category {
  display: flex;
  gap: var(--space-m);
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
  gap: var(--space-s);
}

.memo,
.memo img {
  display: flex;
  align-items: center;
  text-align: right;
  width: var(--space-l);
  height: var(--space-l);
}
</style>