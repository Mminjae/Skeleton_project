<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

// Chart.js 플러그인 등록
Chart.register(...registerables)

const props = defineProps({
  labels: Array,
  incomeData: Array,
  expenseData: Array,
})

const canvasRef = ref(null)
let chartInstance = null

const drawChart = () => {
  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: '지출',
          data: props.expenseData,
          borderColor: '#ef4444',
          tension: 0.4,
        },
        {
          label: '수입',
          data: props.incomeData,
          borderColor: '#6366f1',
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
}

onMounted(drawChart)

watch(() => [props.labels, props.incomeData, props.expenseData], drawChart, { deep: true })
</script>

<template>
  <canvas ref="canvasRef" style="width: 100%; height: 300px" />
</template>
