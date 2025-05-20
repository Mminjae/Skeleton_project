<template>
  <div class="chart-container">
    <div class="header">
      <!-- 현재 차트 종류에 따라 타이틀을 다르게 보여줌 -->
      <h2>{{ currentTitle }}</h2>

      <!-- 버튼 누르면 차트 토글됨 (텍스트도 바뀜) -->
      <button @click="toggleChart">
        {{ currentChart === 'daily' ? ' 일별 >' : '< 월별 ' }}
      </button>
    </div>

    <!-- 구분선 -->
    <div class="divider" />

    <div class="canvas-wrapper">
      <!-- 일별 차트 보여줄 canvas (currentChart가 'daily'일 때만 보임) -->
      <canvas v-show="currentChart === 'daily'" ref="dailyChartRef" />

      <!-- 월별 차트 보여줄 canvas (currentChart가 'monthly'일 때만 보임) -->
      <canvas v-show="currentChart === 'monthly'" ref="monthlyChartRef" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useFinancialSummaryStore } from '@/stores/useFinancialSummaryStore'

const store = useFinancialSummaryStore()

const monthlyIncome = computed(() => {
  const result = store.monthlySummary.map((d) => d.income || 0)
  return Array.from({ length: 12 }, (_, i) => result[i] || 0) // 12개월 처리
})

const monthlyExpense = computed(() => {
  const result = store.monthlySummary.map((d) => d.expense || 0)
  return Array.from({ length: 12 }, (_, i) => result[i] || 0) // 12개월 처리
})

const dailyIncome = computed(() => {
  const result = store.dailySummary.map((d) => d.income || 0)
  return Array.from({ length: 31 }, (_, i) => result[i] || 0) // 31일 처리
})

const dailyExpense = computed(() => {
  const result = store.dailySummary.map((d) => d.expense || 0)
  return Array.from({ length: 31 }, (_, i) => result[i] || 0) // 31일 처리
})

// Chart.js에서 필요한 요소들을 import
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

// Chart.js에서 사용할 요소 등록 (안 하면 에러남!)
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

// 현재 어떤 차트를 보여줄지 상태값
const currentChart = ref('daily') // 기본은 일별 차트

const currentTitle = computed(() => {
  return currentChart.value === 'daily'
    ? `${store.selectedMonth - 1}월 수입/지출 추세`
    : `${store.selectedYear}년 수입/지출 추세`
})

// 각 canvas를 참조하기 위한 ref
const dailyChartRef = ref(null)
const monthlyChartRef = ref(null)

// 차트 인스턴스를 저장할 변수 (destroy 대비해서 저장해둠)
let dailyChartInstance = null
let monthlyChartInstance = null

// 버튼 클릭 시 차트 토글하는 함수
const toggleChart = async () => {
  currentChart.value = currentChart.value === 'daily' ? 'monthly' : 'daily'
  await nextTick() // DOM이 바뀐 후에 resize 실행
  dailyChartInstance?.resize()
  monthlyChartInstance?.resize()
}

// 차트 생성 함수 (Chart.js 사용)
const createChart = (ctx, labels, datasets, isDaily = false) => {
  return new Chart(ctx, {
    type: 'line', // 선형 차트
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index', // 가까운 포인트에 반응
        axis: 'x', // x축 기준
        intersect: false, // 꼭지점이 아닌 곳에서도 반응함
      },
      plugins: {
        tooltip: {
          position: 'nearest', // 툴팁이 마우스에서 멀어지지 않게
          callbacks: {
            // 툴팁 타이틀 설정 (일별이면 "3일"처럼 일 붙임)
            title: (tooltipItems) => {
              const label = tooltipItems[0].label
              return isDaily ? `${label}일` : `${label}`
            },
            // 툴팁 본문 설정 (원 단위 표시)
            label: (context) => `${context.dataset.label}: ${context.formattedValue}원`,
          },
          displayColors: false, // 색상 사각형 없애기
          backgroundColor: '#333',
          titleFont: { weight: 'bold', size: 14 },
          bodyFont: { size: 13 },
          padding: 10,
        },
        legend: {
          display: false, // 범례 제거
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => value.toLocaleString(), // 10000 → 10,000
            font: { size: 12 },
          },
        },
        x: {
          ticks: {
            font: { size: 12 },
          },
        },
      },
      elements: {
        line: {
          tension: 0.05, // 선 부드럽게
        },
        point: {
          radius: 1, // 점 크기
          hoverRadius: 2, // 호버 시 크기
        },
      },
    },
  })
}

// 컴포넌트가 마운트될 때 차트 초기화
onMounted(async () => {
  await store.fetchData() // 🛠
  console.log('✅ 가져온 일별 데이터:', store.dailySummary) // 🛠
  console.log('✅ 가져온 월별 데이터:', store.monthlySummary) // 🛠

  const dailyLabels = Array.from({ length: 31 }, (_, i) => i)
  const monthlyLabels = Array.from({ length: 12 }, (_, i) => `${i}월`)

  // 일별 데이터셋 (수입/지출)
  const dailyDatasets = [
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
  ]

  // 월별 데이터셋 (수입/지출)
  const monthlyDatasets = [
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
  ]

  // 차트 생성
  dailyChartInstance = createChart(
    dailyChartRef.value.getContext('2d'),
    dailyLabels,
    dailyDatasets,
    true,
  )

  monthlyChartInstance = createChart(
    monthlyChartRef.value.getContext('2d'),
    monthlyLabels,
    monthlyDatasets,
  )
})
</script>

<style scoped>
.chart-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 70%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* overflow: hidden; */
  font-family: 'Pretendard', sans-serif; /* ✅ 글자 눌림 해결 */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}

.header h2 {
  flex: 1;
  text-align: center; /* 가운데 정렬 */
  position: relative;
  top: -20px;
  left: 30px;
}

.header button {
  font-size: 16px;
  padding: 0.3rem 0.7rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  top: -20px;
}

.divider {
  border-top: 1px solid #eee;
  margin-bottom: 1rem;
}

/* ✅ canvas를 감싸는 wrapper 추가로 height 계산 */
.canvas-wrapper {
  flex: 1;
  position: relative;
}

/* ✅ canvas 크기 조정 */
canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
