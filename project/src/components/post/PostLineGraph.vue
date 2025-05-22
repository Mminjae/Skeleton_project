<template>
  <div class="chart-container">
    <div class="header">
      <!-- 상단 타이틀 및 차트 토글 버튼 -->
      <h2>{{ currentTitle }}</h2>
      <button @click="toggleChart">
        {{ currentChart === 'daily' ? ' 일별 >' : '< 월별 ' }}
      </button>
    </div>

    <!-- 구분선 -->
    <div class="divider" />

    <div class="canvas-wrapper">
      <!-- 일별 차트 -->
      <canvas v-show="currentChart === 'daily'" ref="dailyChartRef" />

      <!-- 월별 차트 -->
      <canvas v-show="currentChart === 'monthly'" ref="monthlyChartRef" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useFinancialSummaryStore } from '@/stores/useFinancialSummaryStore'

// ✅ Pinia 스토어 가져오기
const store = useFinancialSummaryStore()

// ✅ 수입/지출 데이터 계산 (일별/월별)
const monthlyIncome = computed(() =>
  Array.from({ length: 12 }, (_, i) => store.monthlySummary[i]?.income || 0),
)
const monthlyExpense = computed(() =>
  Array.from({ length: 12 }, (_, i) => store.monthlySummary[i]?.expense || 0),
)
const dailyIncome = computed(() =>
  Array.from({ length: 31 }, (_, i) => store.dailySummary[i]?.income || 0),
)
const dailyExpense = computed(() =>
  Array.from({ length: 31 }, (_, i) => store.dailySummary[i]?.expense || 0),
)

// ✅ Chart.js 구성요소 등록
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend,
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend,
)

// ✅ 현재 차트 유형 (일별 / 월별)
const currentChart = ref('daily')

// ✅ 동적으로 타이틀 생성
const currentTitle = computed(() =>
  currentChart.value === 'daily'
    ? `${store.selectedMonth - 1}월 수입/지출 추세`
    : `${store.selectedYear}년 수입/지출 추세`,
)

// ✅ canvas 참조 및 Chart 인스턴스 저장
const dailyChartRef = ref(null)
const monthlyChartRef = ref(null)
let dailyChartInstance = null
let monthlyChartInstance = null

// ✅ 차트 토글 기능
const toggleChart = async () => {
  currentChart.value = currentChart.value === 'daily' ? 'monthly' : 'daily'
  await nextTick()
  dailyChartInstance?.resize()
  monthlyChartInstance?.resize()
}

// ✅ Chart.js 차트 생성 함수
const createChart = (ctx, labels, datasets, isDaily = false) => {
  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.0,
      layout: { padding: { top: 0, bottom: 0, left: 0, right: 0 } },
      interaction: {
        mode: 'index',
        axis: 'x',
        intersect: false,
      },
      plugins: {
        tooltip: {
          position: 'nearest',
          callbacks: {
            title: (items) => {
              const label = items[0].label
              return isDaily ? `${label}일` : `${label}`
            },
            label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue}원`,
          },
          displayColors: false,
          backgroundColor: '#333',
          titleFont: { weight: 'bold', size: 14 },
          bodyFont: { size: 13 },
          padding: 10,
        },
        legend: { display: false },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => value.toLocaleString(),
            font: { size: 12 },
          },
        },
        x: {
          ticks: {
            font: { size: 12 },
            stepSize: 2,
          },
        },
      },
      elements: {
        line: { tension: 0.05 },
        point: { radius: 1, hoverRadius: 2 },
      },
    },
  })
}

// ✅ 컴포넌트 마운트 시 데이터 fetch 및 차트 렌더링
onMounted(async () => {
  await store.fetchData()

  console.log('✅ 일별 데이터:', store.dailySummary)
  console.log('✅ 월별 데이터:', store.monthlySummary)

  const dailyLabels = Array.from({ length: 31 }, (_, i) => i)
  const monthlyLabels = Array.from({ length: 12 }, (_, i) => `${i}월`)

  dailyChartInstance = createChart(
    dailyChartRef.value.getContext('2d'),
    dailyLabels,
    [
      {
        label: '지출',
        data: dailyExpense.value,
        borderColor: '#ef7979',
        backgroundColor: 'transparent',
        fill: false,
      },
      {
        label: '수입',
        data: dailyIncome.value,
        borderColor: '#5d47d6',
        backgroundColor: 'transparent',
        fill: false,
      },
    ],
    true,
  )

  monthlyChartInstance = createChart(monthlyChartRef.value.getContext('2d'), monthlyLabels, [
    {
      label: '지출',
      data: monthlyExpense.value,
      borderColor: '#ef7979',
      backgroundColor: '#ef7979',
      fill: false,
    },
    {
      label: '수입',
      data: monthlyIncome.value,
      borderColor: '#5d47d6',
      backgroundColor: '#5d47d6',
      fill: false,
    },
  ])
})
</script>

<style scoped>
.chart-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem 1.5rem;
  width: 900px;
  max-width: calc(100% - 260px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Pretendard', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 0;
}

.header h2 {
  flex: 1;
  text-align: center;
  position: relative;
  top: -10px;
  margin-bottom: 0.5rem;
}

.header button {
  font-size: 16px;
  padding: 0.3rem 0.7rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  top: -10px;
}

.divider {
  border-top: 1px solid #eee;
  margin-bottom: 0.5rem;
}

.canvas-wrapper {
  width: 100%;
  height: 280px;
  position: relative;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
