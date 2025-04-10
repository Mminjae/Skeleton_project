<template>
  <div class="chart-container">
    <div class="header">
      <!-- 현재 차트 종류에 따라 타이틀을 다르게 보여줌 -->
      <h2>{{ currentChart === 'daily' ? '일별 수입/지출 추세' : '월별 수입/지출 추세' }}</h2>

      <!-- 버튼 누르면 차트 토글됨 (텍스트도 바뀜) -->
      <button @click="toggleChart">
        {{ currentChart === 'daily' ? ' 일별 >' : '< 월별 ' }}
      </button>
    </div>

    <!-- 구분선 -->
    <div class="divider" />

    <!-- 일별 차트 보여줄 canvas (currentChart가 'daily'일 때만 보임) -->
    <canvas v-show="currentChart === 'daily'" ref="dailyChartRef" />

    <!-- 월별 차트 보여줄 canvas (currentChart가 'monthly'일 때만 보임) -->
    <canvas v-show="currentChart === 'monthly'" ref="monthlyChartRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

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
onMounted(() => {
  // x축 라벨: 1일부터 31일까지
  const dailyLabels = Array.from({ length: 31 }, (_, i) => i + 1)

  // 일별 데이터셋 (수입/지출)
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

  // x축 라벨: 1월부터 12월까지
  const monthlyLabels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`)

  // 월별 데이터셋 (수입/지출)
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
  text-align: center; /* 가운데 정렬 */
}

.header button {
  font-size: 16px;
  padding: 0.3rem 0.7rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.divider {
  border-top: 1px solid #eee;
  margin-bottom: 1rem;
}

canvas {
  width: 60rem; /* 강제로 너비 꽉 채움 */
  height: calc(100% - 100px); /* 높이에서 헤더/버튼 뺀 나머지 */
}
</style>
