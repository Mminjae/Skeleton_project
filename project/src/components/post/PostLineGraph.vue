<template>
  <div class="chart-container">
    <div class="header">
      <h2>{{ currentChart === 'daily' ? '일별 수입/지출 추세' : '월별 수입/지출 추세' }}</h2>
      <button @click="toggleChart">
        {{ currentChart === 'daily' ? '월별 >' : '< 일별' }}
      </button>
    </div>
    <div class="divider" />
    <canvas v-show="currentChart === 'daily'" ref="dailyChartRef" />
    <canvas v-show="currentChart === 'monthly'" ref="monthlyChartRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
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

const currentChart = ref('daily')
const dailyChartRef = ref(null)
const monthlyChartRef = ref(null)

let dailyChartInstance = null
let monthlyChartInstance = null

const toggleChart = async () => {
  currentChart.value = currentChart.value === 'daily' ? 'monthly' : 'daily'
  await nextTick()
  dailyChartInstance?.resize()
  monthlyChartInstance?.resize()
}

const createChart = (ctx, labels, datasets, isDaily = false) => {
  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false,
      },
      plugins: {
        tooltip: {
          position: 'nearest', // ❗ 슝 안 날아오게
          callbacks: {
            title: (tooltipItems) => {
              const label = tooltipItems[0].label
              return isDaily ? `${label}일` : `${label}` // ❗ 일 붙이기
            },
            label: (context) => `${context.dataset.label}: ${context.formattedValue}원`,
          },
          displayColors: false,
          backgroundColor: '#333',
          titleFont: { weight: 'bold', size: 14 },
          bodyFont: { size: 13 },
          padding: 10,
        },
        legend: {
          display: false,
        },
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
          },
        },
      },
      elements: {
        line: {
          tension: 0.3,
        },
        point: {
          radius: 4,
          hoverRadius: 6,
        },
      },
    },
  })
}

onMounted(() => {
  const dailyLabels = Array.from({ length: 31 }, (_, i) => i + 1)
  const dailyDatasets = [
    {
      label: '지출',
      data: [
        450000, 300000, 150000, 200000, 250000, 390000, 100000, 110000, 90000, 230000, 270000,
        400000, 370000, 190000,
      ],
      borderColor: '#ef7979',
      backgroundColor: 'transparent',
      fill: false,
    },
    {
      label: '수입',
      data: [300000, 320000, 280000, 270000, 330000, 500000, 350000, 250000],
      borderColor: '#5d47d6',
      backgroundColor: 'transparent',
      fill: false,
    },
  ]

  const monthlyLabels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`)
  const monthlyDatasets = [
    {
      label: '지출',
      data: [
        2900000, 1200000, 1800000, 2500000, 500000, 600000, 450000, 350000, 1600000, 2000000,
        2200000, 2500000,
      ],
      borderColor: '#ef7979',
      backgroundColor: '#ef7979',
      fill: false,
    },
    {
      label: '수입',
      data: [2100000, 2300000, 2000000, 1900000, 2200000, 3000000, 2800000],
      borderColor: '#5d47d6',
      backgroundColor: '#5d47d6',
      fill: false,
    },
  ]

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
  width: 65rem;
  height: 28.125rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  text-align: center;
}

.header button {
  font-size: 16px;
  padding: 0.3rem 0.7rem;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
}

.divider {
  border-top: 1px solid #eee;
  margin-bottom: 1rem;
}

canvas {
  width: 100% !important;
  height: calc(100% - 100px) !important;
}
</style>
