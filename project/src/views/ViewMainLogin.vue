<script setup>
import { ref } from 'vue'
import PostDonutChart from '@/components/post/PostDonutChart.vue'
import PostCategoryTop from '@/components/post/PostCategoryTop.vue'
import PostRecentHistory from '@/components/post/PostRecentHistory.vue'
import PostLineGraph from '@/components/post/PostLineGraph.vue'

// Svg 좌표 내부에서는 px만 사용할 수 있기 때문에 Rem을 px로 계산하는 코드 (1rem = 16px 기준)

// const donutData = [
//   { percentage: 25, color: '#D1B7FF', label: '식비', tooltip: '이번 달 식비: 25%' },
//   { percentage: 15, color: '#9176E0', label: '교통', tooltip: '교통비: 15%' },
//   { percentage: 10, color: '#D5D7F2', label: '쇼핑', tooltip: '쇼핑 지출: 10%' },
//   { percentage: 20, color: '#B9A8F0', label: '여가/문화', tooltip: '여가 및 문화생활: 20%' },
//   { percentage: 5, color: '#C1BBE6', label: '기타', tooltip: '기타 지출: 5%' },
//   { percentage: 15, color: '#E4DCFF', label: '생필품', tooltip: '정기구독 서비스: 15%' },
//   { percentage: 10, color: '#5D45DB', label: '저축', tooltip: '저축 비율: 10%' },
// ]

// 페이지네이션
const currentIndex = ref(0) // 현재 슬라이드 인덱스
const slideCount = 2 // 슬라이드 총 개수

const goToSlide = (index) => {
  currentIndex.value = index
}
</script>

<template>
  <div class="top">
    <div id="change">
      <div class="donut-graph-container">
        <!-- 도넛 그래프 섹션 (페이지네이션에 포함)-->
        <section v-show="currentIndex === 0" class="donut-graph">
          <div class="section-header">
            <h2>카테고리별 지출 비중</h2>
            <!-- <hr class="section-divider" /> -->
          </div>
          <PostDonutChart />
        </section>
        <!-- 최근 히스토리 섹션 (페이지네이션에 포함)-->
        <section v-show="currentIndex === 1" class="recent-history">
          <PostCategoryTop />
        </section>
        <!-- 페이지네이션 -->
        <div class="pagination-dots">
          <span
            v-for="n in slideCount"
            :key="n"
            :class="['dot', { active: currentIndex === n - 1 }]"
            @click="goToSlide(n - 1)"
          ></span>
        </div>
      </div>
      <!-- 카테고리 탑3 섹션 (항상 고정)-->
      <section class="category-top3">
        <PostRecentHistory />
      </section>
    </div>
    <div class="line-graph">
      <PostLineGraph />
    </div>
  </div>
</template>

<style scoped>
.top {
  width: 100%;
}
.donut-graph-container {
  padding: 0 2rem;
  position: relative;
}
#change {
  width: 100%;
  overflow: hidden; /* 슬라이드가 벗어나지 않도록 숨김 처리 */
  display: flex;
}
#change > section {
  /* border: 1px solid red; */
}

/* 도넛차트 h2  */
.section-header {
  font-size: 15px;
  position: relative;
  left: 8rem;
  top: 3rem;
  padding-bottom: 0.4rem;
}

.section-header::after {
  content: '';
  position: absolute;
  left: -100px; /* 부모 기준으로 왼쪽 0 */
  bottom: 0;
  top: -5rem;
  width: 500px; /* 원하는 밑줄 길이 */
  border-bottom: 2px solid #e4e4e4; /* 원하는 색상 */
}

.donut-graph {
  position: relative;
  top: -2rem;
  /* bottom: -5rem; */
}
.recent-history {
  display: block;
  width: 50%; /* 슬라이드 하나씩 보이도록 설정 */
  height: 50vh; /* 각 섹션을 페이지처럼 보이게 설정 */
  transition: transform 0.5s ease-in-out; /* 부드러운 전환 효과 */
}

.recent-history {
  padding-left: 1.9rem;
}

.category-top3 {
  width: 50%;
  height: 50vh;
  display: block;
  padding: 0 2rem;
  /* 고정된 섹션이라 특별한 페이지네이션 필요 없음 */
}

.pagination-dots {
  display: flex;
  justify-content: center;
  padding-left: 1rem;
  position: absolute;
  left: 17rem;
  bottom: 2rem;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: gray;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.dot.active {
  background-color: black;
}

.line-graph {
  padding-left: 5rem;
}
</style>
