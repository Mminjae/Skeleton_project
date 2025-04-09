<script setup>
// import { ref } from 'vue'
import PostDonutChart from '../components/post/PostDonutChart.vue'

// Svg 좌표 내부에서는 px만 사용할 수 있기 때문에 Rem을 px로 계산하는 코드 (1rem = 16px 기준)
const remToPx = (rem) => rem * 16
</script>

<template>
  <div>
    <h1>월별 재정요약 로그인 (main)</h1>
    <h2>도넛 그래프</h2>
    <PostDonutChart
      :sizeX="remToPx(33.75)"
      :sizeY="remToPx(28.125)"
      :circleSize="remToPx(20.36125)"
      :percentage="75"
    />
    <!-- 도넛 데이터 db 연결하기 -->
  </div>
</template>
