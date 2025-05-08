<template>
  <div>
    <h2>Donut Chart Data</h2>
    <ul>
      <li v-for="(item, index) in donutChartStore.data" :key="index">
        {{ item.name }} - {{ item.amount }}
      </li>
    </ul>
    <button @click="fetchData">Load Data</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useDonutChartStore } from '@/stores/useDonutChartStore' // 스토어 가져오기

export default {
  setup() {
    // useDonutChartStore 호출
    const donutChartStore = useDonutChartStore()

    // 데이터 로드 함수
    const fetchData = async () => {
      await donutChartStore.fetchData(1) // 예시로 userId가 1인 데이터를 가져옴
    }

    // 페이지가 마운트될 때 데이터 불러오기
    onMounted(() => {
      fetchData()
    })

    return {
      donutChartStore, // store를 반환하여 템플릿에서 사용 가능
      fetchData, // 템플릿에서 클릭 시 데이터 불러올 수 있도록
    }
  },
}
</script>

<style scoped>
/* 스타일은 필요에 따라 추가 */
</style>
