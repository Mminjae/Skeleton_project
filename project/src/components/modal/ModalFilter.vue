<script setup>
  const selectedType = ref(null) // 'expense' 또는 'income' 상태관리

</script>

<template>
  <h1>필터 모달 (page4)</h1>
  <!-- 필터모달을 Open하는 button 
      1.data-bs-toggle: 버튼 클릭 시 모달이 열리도록 설정.
      2.data-bs-target: 열릴 모달의 ID를 지정.
      3.-->
  <button
    type="button"
    class="btn-fillter"
    data-bs-toggle="modal"
    data-bs-target="#FilterModal"
    data-bs-whatever="@mdo"
  >
    <!-- <div class=".button--filterIcon__layout" alt="필터아이콘"></div> -->
    필터
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
  >
    <div class="modal-dialog">
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
              id="year"
              value="year" 
              v-model="selectedPeriod"
              />
           <label class="btn btn-primary" for="year">연</label>
            <!-- '월' 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="period"
              id="month"
              value="month"
              v-model="selectedPeriod"
            />
            <label class="btn btn-primary" for="month">월</label>
            <!-- '일' 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="period"
              id="day"
              value="day"
              v-model="selectedPeriod"
            />
            <label class="btn btn-primary" for="day">일</label>
          </div>
          <!-- 날짜필터2-달력버튼 -->
          <hr />
          <div class="callendar-group">
            <input type="date" id="start" class="input-callendar" name="date-start" value="" v-model="startDate">
            <label for="date"></label>
            <em>~</em>
            <input type="date" id="end" class="input-callendar" name="date-end" value="" v-model="endDate">
            <label for="date"></label>
          </div>
          <hr>
          <!-- 카테고리필터1:수입(default active)체크박스 : 월급/ 금융수입/ 용돈/ 이월/ 기타  -->
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
          <div class="btn-group cash-card-group" role="group" aria-label="현금/카드 선택">
           <!-- 현금 라디오 버튼 (기본 선택) -->
           <input 
              type="radio" 
              class="btn-check" 
              name="transactionType3" 
              id="cash" 
              value="cash"
              v-model="selectedPaymentMethod" 
            />
           <label class="btn btn-primary" for="cash">현금</label>
            <!-- 카드 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType3"
              id="card"
              value="card"
              v-model="selectedPaymentMethod"
            />
            <label class="btn btn-primary" for="card">카드</label>
          </div>
        </div>
        <!-- 하단 버튼(초기화, 완료) -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-filter-reset" @click="resetFilters">초기화</button>
          <button type="button" class="btn btn-primary btn-filter-done">완료</button>
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

  border: 1px red solid;
  border-radius: 5px;

  width: 28.125rem; /* 450px */
  height: 3.438rem; /* 55px */

}
.callendar-group>em{
  font-size: medium;
  font-weight: bold;
  
  width: 10.16px;
  height: 24.29px;
  text-align: center;
}
.input-callendar{
  width: 12.305rem; /* 196.88px */
  height: 2.5rem;   /* 40px */
}
.checkbox--category{
  width: 27.813rem;  /* 445px */
  height: 7.375rem;  /* 118px */

}

.btn{
  width: 6.25rem;  /* 100px */
  height: 2.5rem;  /* 40px */
  border-radius: 5px;
}
.btn-primary{
  background-color: var(--color-white);
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
  border: var(--color--gray-light) 0.1rem solid;
  width: 5rem;  /*figma최신화 */
}
.btn-filter-reset{

}
.btn-filter-done{
  
}
/*------------모달푸터 END-----------*/
/*--------------------필터모달 CSS END----------------*/
</style>
