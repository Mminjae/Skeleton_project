<script setup>
import { ref, computed } from 'vue'
import LineGraph from '@/components/modal/LineGraph.vue'

const viewType = ref('daily')

// 일별 데이터
const dailyLabels = ['1', '2', '3', '4', '5']
const dailyIncome = [100000, 200000, 0, 0, 500000]
const dailyExpense = [200000, 100000, 150000, 300000, 400000]

// 월별 데이터
const monthlyLabels = ['1월', '2월', '3월', '4월']
const monthlyIncome = [2500000, 2000000, 3000000, 1800000]
const monthlyExpense = [2800000, 1500000, 2900000, 1700000]

// 보기 모드에 따라 계산된 데이터 제공
const chartLabels = computed(() => (viewType.value === 'daily' ? dailyLabels : monthlyLabels))
const chartIncome = computed(() => (viewType.value === 'daily' ? dailyIncome : monthlyIncome))
const chartExpense = computed(() => (viewType.value === 'daily' ? dailyExpense : monthlyExpense))
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-end gap-2">
      <button @click="viewType = 'daily'">일별</button>
      <button @click="viewType = 'monthly'">월별</button>
    </div>

    <h2 class="text-xl font-bold">{{ viewType === 'daily' ? '일별' : '월별' }} 수입/지출 추세</h2>

    <LineGraph :labels="chartLabels" :incomeData="chartIncome" :expenseData="chartExpense" />
  </div>
</template>
