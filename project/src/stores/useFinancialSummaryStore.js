import { defineStore } from "pinia"
import { ref, computed } from "vue"
import api from '../../lib/axios'

export const useFinancialSummaryStore = defineStore('financialSummary', () => {
  console.log("hbk useFinancialSummaryStore")
  const data = ref([]);

  // 전체 데이터 가져오기
  const fetchData = async (userId) => { // userId를 인자로 받음
    try {
      const response = await api.get('transactions');
      console.log("서버 응답:", response.data); // 🔍 응답 확인
      const filteredData = response.data.filter(item => item.userId === userId);
      console.log("필터링된 데이터:", filteredData); // 🔍 필터링 확인

      data.value = filteredData;
    } catch (error) {
      console.error('전체 데이터 가져오기 실패 : ', error);
    }
  }

  // 최근 거래내역 가져오기 : -> PostRecentHistory.vue
  const recentData = computed(() => {
    return data.value
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // 날짜로 내림차순 정렬하기
      .slice(0, 5)
      .map(tx => ({
        category: tx.category,
        merchant: tx.merchant,
        date: tx.date,
        amount: tx.amount
      }));
  });

  // 카테고리별 합산 및 평균 계산 : -> PostDonutChart.vue
  const categorizedData = computed(() => {
    const categorySum = {}; // 카테고리별 총합 저장
    const categoryCount = {};  // 카테고리별 거래 수 저장

    // a. 카테고리별 금액 총합 & 거래 개수 계산
    data.value.forEach(transaction => {
      if (!categorySum[transaction.category]) { // 해당 카테고리가 처음 등장하면 초기화 하기
        categorySum[transaction.category] = 0; // 총합 초기화
        categoryCount[transaction.category] = 0; // 개수 초기화
      }
      categorySum[transaction.category] += transaction.amount;
      categoryCount[transaction.category] += 1;
    })

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

  console.log("data", data)

  // 카테고리 top 3 : -> PostCategoryTop.vue
  const bestCategory = computed(() => {
    // 현재 날짜를 기준으로 이번 달의 첫날과 마지막 날 계산
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // 이번 달 첫 날
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // 이번 달 마지막 날

    // 이번 달의 거래만 필터링
    const thisMonthData = data.value.filter(tx => {
      const transactionDate = new Date(tx.date);
      return transactionDate >= firstDayOfMonth && transactionDate <= lastDayOfMonth;
    });

    // 카테고리별 금액 합산 후 상위 3개 카테고리 추출
    const categorySum = {};

    thisMonthData.forEach(tx => {
      if (!categorySum[tx.category]) {
        categorySum[tx.category] = 0;
      }
      categorySum[tx.category] += tx.amount;
    });

    // 카테고리별 금액 합산 후 내림차순으로 정렬하고, top 3 카테고리 추출
    const topCategories = Object.keys(categorySum)
      .map(category => ({
        category,
        amount: categorySum[category]
      }))
      .sort((a, b) => b.amount - a.amount) // 내림차순 정렬
      .slice(0, 3); // 상위 3개 카테고리

    return topCategories;
  });

  return { data, fetchData, recentData, categorizedData, bestCategory };


})