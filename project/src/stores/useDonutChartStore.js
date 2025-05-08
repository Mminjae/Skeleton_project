import { defineStore } from 'pinia' // pinia store를 정의하는 함수 -> store를 만들고, state, actions, getter를 설정 할 수 있게 한다.
import { ref, computed } from 'vue' // ref : 데이터가 변할때 자동으로 반응하여 저장 | computed : ref로 저장된 데이터를 바탕으로 값을 자동으로 계산할때 사용
import api from '../../lib/axios' // axios 인스턴스를 export 해서 baseURL, headers를 사용할 수 있게 import 함

export const useDonutChartStore = defineStore('donutChart', () => { // useDonutChartStore : 스토어 파일 이름 | donutChart : pinia store 이름 -> 다른 컴포넌트에서 이 store를 참조
  const data = ref([]);

  // 1. 전체 데이터 가져오기
  const fetchData = async (userId) => { // userId를 인자로 받음
    try {
      const response = await api.get('transactions'); // 데이터 안의 transactions의 데이터들을 다 가져오기
      const filteredData = response.data.filter(transaction => transaction.userId === userId); // userId가 같은 데이터만 필터링. transactions 배열에서 userId가 userId와 일치하는 항목을 모두 필터링하는 코드

      data.value = filteredData; //필터링된 데이터를 store의 data에 저장
    } catch (error) {
      console.error('전체 데이터 가져오기 실패 : ', error);
    }
  }

  // 2. 카테고리별 합산 및 평균 계산
  const categorizedData = computed(() => {
    const categorySum = {}; // 카테고리별 총합 저장
    const categoryCount = {};  // 카테고리별 거래 수 저장

    // a. 카테고리별 금액 총합 & 거래 개수 계산
    data.value.forEach(transaction => {
      if (!categorySum[transaction.category]) { // 해당 카테고리가 처음 등장하면 초기화 하기
        categorySum[transaction.category] = 0; // 총합 초기화
        categoryCount[transaction.category] = 0; // 개수 초기화
      }
    })

    categorySum[transaction.category] += transaction.amount;
    categoryCount[transaction.category] += 1;

    // b. 각각의 카테고리별 평균 계산 -> 배열로 반환
    const categoryAverage = Object.keys(categorySum).map(category => {
      return {
        category, // 카테고리 이름
        averageAmount: categorySum[category] / categoryCount[category], // 평균 금액
        totalAmount: categorySum[category] // 카테고리 총합 금액
      };
    });

    // c. 평균 금액 기준 -> 카테고리별 내림차순 정렬
    categoryAverage.sort((a, b) => b.averageAmount - a.averageAmount)

    // d-1. 전체 금액 계산 (모든 카테고리 금액 총합)
    const totalAmount = categoryAverage.reduce((sum, item) => sum + item.totalAmount, 0);
    // d-2. 각 카테고리가 전체에서 차지하는 비율 계산
    categoryAverage.forEach(item => {
      item.percentage = ((item.totalAmount / totalAmount) * 100);
    })

    return categoryAverage; // 카테고리별 평균, 총합, 비율 정보가 포함된 배열 반환
  });

  return { data, fetchData, categorizedData };
})