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
      item.percentage = Math.round((item.totalAmount / totalAmount) * 100);
    })

    let accumulated = 0;
    categoryAverage.forEach((item, index) => {
      if (index === categoryAverage.length - 1) {
        // 마지막 항목은 100 - 누적값으로 보정 (오차 보정)
        item.percentage = 100 - accumulated;
      } else {
        item.percentage = Math.floor(item.percentage);
        accumulated += item.percentage;
      }
    });


    return categoryAverage.filter(item => item.percentage >= 1); // 카테고리별 평균, 총합, 비율 정보가 포함된 배열 반환
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

  // 이번 달 지출/수입 일별 합계 -> PostLineGraph.vue 1
  const dailySummary = computed(() => {
    const summary = {}

    // 🟣 최신 날짜 기준 연, 월 구하기
    const latest = [...data.value].sort((a, b) => {
      const dateA = new Date(a.dateYear, a.dateMonth - 1, a.dateDay)
      const dateB = new Date(b.dateYear, b.dateMonth - 1, b.dateDay)
      return dateB - dateA
    })[0]

    const year = latest?.dateYear ?? new Date().getFullYear()
    const month = latest?.dateMonth ?? (new Date().getMonth() + 1) // 월 계산 수정: 1-based 월로 변경

    // 🟣 해당 월 데이터만 필터링
    const filtered = data.value.filter(item =>
      item.dateYear === year && item.dateMonth === month // 현재 연도, 월에 맞는 데이터만 필터링
    )


    filtered.forEach(item => {
      const key = `${item.dateYear}-${item.dateMonth}-${item.dateDay}`
      if (!summary[key]) {
        summary[key] = { income: 0, expense: 0 }
      }

      const amount = Number(item.amount)

      if (item.isIncome) {
        summary[key].income += amount
      } else {
        summary[key].expense += Math.abs(amount)
      }
    })

    return Object.entries(summary).map(([date, { income, expense }]) => ({
      date,
      income,
      expense
    }))
  })


  // 올해 지출/수입 월별 합계 -> PostLineGraph.vue 2
  const monthlySummary = computed(() => {
    const summary = Array.from({ length: 12 }, () => ({
      income: 0,
      expense: 0
    }))

    // 🟣 최신 연도 기준 필터링
    const latest = [...data.value].sort((a, b) => {
      const dateA = new Date(a.dateYear, a.dateMonth - 1, a.dateDay)
      const dateB = new Date(b.dateYear, b.dateMonth - 1, b.dateDay)
      return dateB - dateA
    })[0]

    const year = latest?.dateYear ?? new Date().getFullYear()

    const filtered = data.value.filter(item => item.dateYear === year)

    filtered.forEach(item => {
      const monthIndex = item.dateMonth - 1
      const amount = Number(item.amount)

      if (monthIndex < 0 || monthIndex > 11) return

      if (item.isIncome) {
        summary[monthIndex].income += amount
      } else {
        summary[monthIndex].expense += Math.abs(amount)
      }
    })

    return summary
  })

  const selectedYear = computed(() => {
    const latest = [...data.value].sort((a, b) => {
      const dateA = new Date(a.dateYear, a.dateMonth - 1, a.dateDay);
      const dateB = new Date(b.dateYear, b.dateMonth - 1, b.dateDay);
      return dateB - dateA; // 최신순 정렬
    })[0];

    return latest ? latest.dateYear : new Date().getFullYear();
  });

  // selectedMonth 계산
  const selectedMonth = computed(() => {
    const latest = [...data.value].sort((a, b) => {
      const dateA = new Date(a.dateYear, a.dateMonth - 1, a.dateDay);
      const dateB = new Date(b.dateYear, b.dateMonth - 1, b.dateDay);
      return dateB - dateA; // 최신순 정렬
    })[0];

    return latest ? latest.dateMonth : (new Date().getMonth() + 1); // 1-based month 반환
  });

  return { data, fetchData, recentData, categorizedData, bestCategory, dailySummary, monthlySummary, selectedYear, selectedMonth };
});