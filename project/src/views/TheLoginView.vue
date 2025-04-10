<script setup>
// import { ref } from 'vue'
import PostDonutChart from '../components/post/PostDonutChart.vue'
import PostCategoryTop from '../components/post/PostCategoryTop.vue'

// Svg 좌표 내부에서는 px만 사용할 수 있기 때문에 Rem을 px로 계산하는 코드 (1rem = 16px 기준)
const remToPx = (rem) => rem * 16

const donutData = [
  { percentage: 25, color: '#FF3B30', label: '식비 25%', tooltip: '이번 달 식비: 25%' },
  { percentage: 15, color: '#007AFF', label: '교통', tooltip: '교통비: 15%' },
  { percentage: 10, color: '#FF9500', label: '쇼핑', tooltip: '쇼핑 지출: 10%' },
  { percentage: 20, color: '#34C759', label: '여가/문화', tooltip: '여가 및 문화생활: 20%' },
  { percentage: 5, color: '#AF52DE', label: '기타', tooltip: '기타 지출: 5%' },
  { percentage: 15, color: '#FFCC00', label: '정기구독', tooltip: '정기구독 서비스: 15%' },
  { percentage: 10, color: '#5AC8FA', label: '저축', tooltip: '저축 비율: 10%' },
]
</script>

<template>
  <div>
    <h1>월별 재정요약 로그인 (main)</h1>
    <PostCategoryTop />
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
