<script setup>
const props = [
	{
		category: '',
		type: String,
		required: true,
	},
]

const expenses = {
	'foodcost': { name: '식비' },
	'saving': { name: '저축' },
	'transport': { name: '교통비' },
	'culture': { name: '문화생활' },
	'essentials': { name: '생필품' },
	'shopping': { name: '쇼핑' },
	'miscExpense': { name: '기타' },
}
</script>

<template>
	<template v-for="(item, key) in expenses" :key="key">
		<span>{{ item.name }}</span>
		<span v-if="key == 'miscExpense'">, </span>
	</template>
</template>

<style scoped></style>