<script setup>
  import { ref ,watch } from 'vue'
  import { useTransactionStore } from '@/stores/useTransactionStore'  //axios를 이용해 필터조건을 전달하기위해, store 호출.
  import IconIcon from '@/components/base/iconIcon.vue'; //모달아이콘
  //Axios & Pinia용 스크립트
  const transactionStore = useTransactionStore()

  //Axios & Pinia용 스크립트END

  //날짜필터1-라디오버튼(연/월/일)+날짜필터2-달력버튼
  const filters = ref({
  selectedPeriod: null,     // 올해"thisYear", 이번달"thisMonth", 오늘"today", "custom"
  date_gte: '',            // YYYY-MM-DD
  date_lte: '',              // YYYY-MM-DD
  lastChanged: '',          // "selectedPeriod" or "calendar"
})
  watch(() => filters.value.selectedPeriod, (newVal) => {
  if (!newVal) return;

  filters.value.lastChanged = 'selectedPeriod';

  const today = new Date();
  const format = (d) => d.toISOString().slice(0, 10);

  switch (newVal) {
    case 'today':
      filters.value.date_gte = format(today);
      filters.value.date_lte = format(today);
      break;
    case 'thisMonth': {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      filters.value.date_gte = format(start);
      filters.value.date_lte = format(end);
      break;
    }
    case 'thisYear': {
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear(), 11, 31);
      filters.value.date_gte = format(start);
      filters.value.date_lte = format(end);
      break;
    }
  }
}); 
 watch([() => filters.value.date_gte, () => filters.value.date_lte], ([start, end]) => {
  if (!start || !end) return;

  // 날짜 선택 시 selectedPeriod는 "custom"으로
  filters.value.selectedPeriod = 'custom';
  filters.value.lastChanged = 'calendar';
});
  //expense' 또는 'income' 상태관리
  const selectedType = ref(null) // 초기설정
  // 2종류의 카테고리 박스(수입/지출) 배열로 상태관리
  const incomeCategories = [
    { id: 'salary', label: '월급' },
    { id: 'allowance', label: '용돈' },
    { id: 'carryover', label: '이월' },
    { id: 'investment', label: '금융소득' },
    { id: 'miscIncome', label: '기타' }
  ]
  const expenseCategories = [
  { id: 'foodcost', label: '식비' },
  { id: 'saving', label: '저축' },
  { id: 'transport', label: '교통비' },
  { id: 'culture', label: '문화생활' },
  { id: 'essential', label: '생필품' },
  { id: 'shopping', label: '쇼핑' },
  { id: 'miscExpense', label: '기타' }
]
const selectedCategories = ref([])  //초기설정
// 2종류의 카테고리 박스(수입/지출) 배열로 상태관리 END

// 지불수단 선택(현금/카드) 라디오박스 상태
const selectedPaymentMethod = ref(null)  //초기설정

// '초기화버튼'에 탑재되는 초기화 함수
  const resetFilters = () => {
  filters.value.selectedPeriod = null        //연/월/일 초기화
  filters.value.date_gte = ''             //날짜-시작일 초기화
  filters.value.date_lte = ''
  filters.value.lastChanged = ''               //날짜-종료일 초기화
  selectedType.value = null          //수입/지출 초기화
  selectedCategories.value = []      //카테고리 초기화
  selectedPaymentMethod.value = null //지불수단(현금/카드)초기화
  }
// '완료버튼'에 탑재되는 저장함수 (나중에 db.json과 연동하여 거래데이터transactions 이용하여 필터적용)
  const applyFilters = () => {
    const queryParams = {};

      if (filters.value.date_gte && filters.value.date_lte) {
        queryParams.date_gte = filters.value.date_gte;
        queryParams.date_lte = filters.value.date_lte;
      }

      if (selectedType.value) {
        queryParams.isIncome = selectedType.value === 'income';
      }

      if (selectedType.value === 'expense' && selectedPaymentMethod.value) {
        queryParams.paymentMethod = selectedPaymentMethod.value;
      }

      if (selectedType.value && selectedCategories.value.length > 0) {
        //예외처리:selectedType이 있는 경우 && 카테고리가 하나라도 선택된 상황에만 카테고리 value를 요청할것.
        // JSON Server에서는 category=foodcost&category=shopping 처럼 다중 쿼리가 가능
        queryParams.category = selectedCategories.value;
      }

      console.log('쿼리 파라미터:', queryParams);
      // 이걸 기반으로 pinia action 호출하거나 axios 직접 요청 가능
      transactionStore.fetchTransactions(queryParams) //Pinia store action 호출
  }

</script>

<template>
  <!-- 필터모달을 Open하는 button 
      1.data-bs-toggle: 버튼 클릭 시 모달이 열리도록 설정.
      2.data-bs-target: 열릴 모달의 ID를 지정.-->
  <button
    type="button"
    class="btn-filter"
    data-bs-toggle="modal"
    data-bs-target="#FilterModal"
    data-bs-whatever="@mdo"
    @click="resetFilters"
    scale="1.5"   
  ><!-- 모달을 닫았다 다시 열경우, 필터 초기화 -->
  <!-- <div class=".button--filterIcon__layout" alt="필터아이콘"></div> -->
    <IconIcon icon="filter" scale="1.5"/>
  </button>
  <!-- 필터모달을 Open하는 button END -->

  <!-- 필터모달 레이아웃 div 
      1.id="FilterModal": 이 모달을 식별하기위한 id
      2.class="modal fade": Bootstrap 모달효과를 지정, 이때 fade는 부드러운 전환효과
      3.aria-hidden="true": 모달 비활성화시 스크린 리더가 이를 무시하도록 설정.
      -->
  <div
    id="FilterModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="FilterModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- 모달 헤더 (Exit버튼) -->
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- 모달 본문(필터 툴:날짜필터1,2 + 카테고리필터 + 수입/지출 + 현금/카드) -->
        <div class="modal-body">
          <!-- 날짜필터1-연/월/일 Radio버튼 -->
          
          <div class="btn-group y-m-d-group" role="group" aria-label="연,월,일 선택">

           <!-- '연' 라디오 버튼 (기본 선택) -->
           <input 
              type="radio" 
              class="btn-check" 
              name="period" 
              id="thisYear"
              value="thisYear" 
              v-model="filters.selectedPeriod"
              />
           <label class="btn btn-primary" for="thisYear">올해</label>
            <!-- '월' 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="period"
              id="thisMonth"
              value="thisMonth"
              v-model="filters.selectedPeriod"
            />
            <label class="btn btn-primary" for="thisMonth">이번달</label>
            <!-- '일' 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="period"
              id="today"
              value="today"
              v-model="filters.selectedPeriod"
            />
            <label class="btn btn-primary" for="today">오늘</label>
          </div>
          <!-- 날짜필터2-달력버튼 -->
          <hr />
          <div class="callendar-group">
            <input type="date" id="date-start" class="input-callendar" name="date-start" v-model="filters.date_gte">
            <label for="date-start"></label>
            <em>~</em>
            <input type="date" id="date-end" class="input-callendar" name="date-end" v-model="filters.date_lte">
            <label for="date-end"></label>
          </div>
          <hr>
          <!-- 카테고리필터1:수입체크박스 : 월급/ 금융수입/ 용돈/ 이월/ 기타  -->
          <div class="checkbox--category btn-group checkbox--income" 
               v-show="selectedType === 'income'">    <!-- 수입 카테고리박스 조건부 렌더링 -->
               <template v-for="category in incomeCategories" :key="category.id">
                 <input
                    type="checkbox"
                    class="btn-check"
                    :id="category.id"
                    :value="category.id"
                    v-model="selectedCategories"/>
                 <label class="btn btn-primary" :for="category.id">{{ category.label }}</label>
               </template>
          </div>
          <!-- 카테고리필터2:지출-체크박스                : 식비/저축/교통비/문화생활/생필품/쇼핑 -->
          <div class="checkbox--category btn-group checkbox--expense "
               v-show="selectedType === 'expense'">    <!-- 지출 카테고리박스 조건부 렌더링 -->
           <template v-for="category in expenseCategories" :key="category.id">
            <input
              type="checkbox"
              class="btn-check"
              :id="category.id"
              :value="category.id"
              v-model="selectedCategories"/>
            <label class="btn btn-primary" :for="category.id">{{ category.label }}</label>
           </template>  
          </div>
          <hr>
          <!-- 분류필터 수입/지출 Radio버튼-->
          <!-- 라디오 토글 버튼 그룹:수입/지출 -->
          <div class="btn-group income-expense-group" role="group" aria-label="수입/지출 선택">
           <!-- 수입 라디오 버튼 (기본 선택) -->
           <input
              type="radio"
              id="typeIncome" 
              value="income" 
              class="btn-check" 
              name="transactionType2"  
              v-model="selectedType" 
             />
           <label class="btn btn-primary" for="typeIncome">수입</label>
            <!-- 지출 라디오 버튼 -->
            <input
            type="radio"
              id="typeExpense" 
              value="expense" 
              class="btn-check" 
              name="transactionType2"
              v-model="selectedType"
            />
            <label class="btn btn-primary" for="typeExpense">지출</label>
          </div>
          <hr>
          <!-- 지불수단필터 현금/카드 Radio버튼 (default=Deactive, '지출'활성화시 active) -->
          <!-- 라디오 토글 버튼 그룹:현금/카드 -->
          <div class="btn-group cash-card-group" role="group" aria-label="현금/카드 선택" 
              >
           <!-- 현금 라디오 버튼 (기본 선택) -->
           <input 
              type="radio" 
              class="btn-check" 
              name="transactionType3" 
              id="cash" 
              value="현금"
              v-model="selectedPaymentMethod"
              :disabled="selectedType !== 'expense'" 
            /> <!-- '지출'선택시에만 클릭가능 -->
           <label class="btn btn-primary" for="cash">현금</label>
            <!-- 카드 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType3"
              id="card"
              value="카드"
              v-model="selectedPaymentMethod"
              :disabled="selectedType !== 'expense'"
            /> <!-- '지출'선택시에만 클릭가능 -->
            <label class="btn btn-primary" for="card">카드</label>
          </div>
        </div>
        <!-- 하단 버튼(초기화, 완료) -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-filter-reset" @click="resetFilters">초기화</button>
          <button type="button" class="btn btn-primary btn-filter-done" @click="applyFilters">완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
*{
  font-family: 'Noto Sans KR', sans-serif;
}
/* 모달이 나타나기전, 필터모달을 불러오는 버튼의 CSS */
.button--filterIcon__layout {
  width: 2.5rem; /* 40px */
  height: 2.5rem;
}
.button--calendarIcon__layout {
  width: 2.75rem; /* 44px */
  height: 2.75rem;
}
/* 모달이 나타나기전, 필터모달을 불러오는 버튼의 CSS End */


/*---------------------필터모달 CSS-------------------*/
.modal-content{

  width: 37.5rem;    /* 600px */
  height: 31.25rem;  /* 500px */

  background-color:var(--color-white) ;
}
.modal-body {
  max-height: 400px;
  overflow-y: auto;
}
.callendar-group{
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  border: 1px solid var(--color-gray-light);
  border-radius: 5px;
  padding-left: 0.5rem;

  width: 28.125rem; /* 450px */
  height: 3.438rem; /* 55px */

}
.callendar-group>em{
  font-size: medium;
  font-weight: bold;
  
  width: 10.16px;
  height: 24.29px;
  text-align: center;
  padding-right: 1rem;
}
.input-callendar{
  width: 12.305rem; /* 196.88px */
  height: 2.5rem;   /* 40px */
  border: 1px solid var(--color-gray-light);
  padding-left: 1rem;
}
.checkbox--category{
  width: 27.813rem;  /* 445px */
  height: 7.375rem;  /* 118px */
}

.btn{
  width: 6.25rem;  /* 100px */
  height: 2.5rem;  /* 40px */
}
.btn-check:checked+.btn, .btn.active, .btn.show, .btn:first-child:active, :not(.btn-check)+.btn:active {
  background-color: var(--color-purple9);
  color: var(--color-white);
  border: none;
}
.btn-group>.btn, .btn-group>.btn.dropdown-toggle-split:first-child, .btn-group>.btn:not(:last-child):not(.dropdown-toggle) {
  border-radius: 5px;
}
.btn:hover {
  background-color: var(--color-purple9);
  color: var(--color-white);
  border: none;
}
.modal-footer > .btn:hover {
  background-color: var(--color-purple9);
  color: var(--color-white);
  border: none;
}
.btn-primary{
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-light);
  color: var(--color-black);
}
.btn-group{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 0.938rem; /* 15px */
}
.btn-group>.btn {flex: 0 1 auto;}
.y-m-d-group{
  width: 20.625rem; /* 330px */
}
.income-expense-group,
.cash-card-group{
  width: 13.438rem; /* 215px */
}
/*------------모달푸터--------------*/
.modal-footer .btn,
.modal-header .btn {
  background-color: var(--color-white);
  color: var(--color-black);
  border: 1px solid var(--color-gray-light);
  width: 6rem;  /*figma최신화 */
}
.btn-filter-reset{
}
.btn-filter-done{
}
.btn-filter{
  background-color: transparent;
  border: none;
  margin-left: 4rem;
}
/*------------모달푸터 END-----------*/
/*--------------------필터모달 CSS END----------------*/
</style>
