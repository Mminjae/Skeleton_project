<script setup>
// import { ref } from 'vue'
import PostDonutChart from '../components/post/PostDonutChart.vue'

// Svg 좌표 내부에서는 px만 사용할 수 있기 때문에 Rem을 px로 계산하는 코드 (1rem = 16px 기준)
const remToPx = (rem) => rem * 16

const donutData = [
  { percentage: 25, color: '#FF3B30' }, // 밝은 레드
  { percentage: 15, color: '#007AFF' }, // 비비드 블루
  { percentage: 10, color: '#FF9500' }, // 비비드 오렌지
  { percentage: 20, color: '#34C759' }, // 밝은 초록
  { percentage: 5, color: '#AF52DE' }, // 비비드 보라
  { percentage: 15, color: '#FFCC00' }, // 쨍한 옐로우
  { percentage: 10, color: '#5AC8FA' }, // 밝은 하늘색
]
</script>

<template>
  <div>
    <h1>월별 재정요약 로그인 (main)</h1>
    <h2>도넛 그래프 카테고리 7개</h2>
    <PostDonutChart
      :sizeX="remToPx(33.75)"
      :sizeY="remToPx(28.125)"
      :circleSize="remToPx(20.36125)"
      :segments="donutData"
    />
    <!-- 도넛 데이터 db 연결하기 -->
  </div>
</template>
