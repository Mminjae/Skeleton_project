<script setup>
import incomeIcon from './incomeIcon.vue';
import ExpenseIcons from './ExpenseIcons.vue';

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  isIncome: {
    type: Boolean,
    required: true,
  },
})

const expenses = {
	'foodcost': { name: '식비' },
	'saving': { name: '저축' },
	'transport': { name: '교통비' },
	'culture': { name: '문화생활' },
	'essentials': { name: '생필품' },
	'shopping': { name: '쇼핑' },
	'miscExpense': { name: '기타' },
}

const incomes = {
  'salary': { name: '월급' },
  'finance': { name: '금융소득' },
  'allowance': { name: '용돈' },
  'carryover': { name: '이월' },
  'miscIncome': { name: '기타' },
}
</script>

  <template>
	<template v-if="isIncome">
	  <template v-for="(item, key) in incomes" :key="key">
		<span class="icon" v-if="key === category"><incomeIcon :icon="key" scale="0.9"/> {{ item.name }}</span>
	  </template>
	</template>
	<template v-else>
	  <template v-for="(item, key) in expenses" :key="key">
		<span class="icon" v-if="key === category"><ExpenseIcons :icon="key" scale="0.9"/>{{ item.name }}</span>
	  </template>
	</template>
  </template>

<style scoped>
span {
  font-size: 0.95rem;
}
.icon {
	display: flex;
	gap: 0.7rem;
	align-items: center;
}
</style>