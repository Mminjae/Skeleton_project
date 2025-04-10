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
              name="transactionType1" 
              id="year" 
              autocomplete="on" 
              />
           <label class="btn btn-primary" for="year">연</label>
            <!-- '월' 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType1"
              id="month"
              autocomplete="off"
            />
            <label class="btn btn-primary" for="month">월</label>
            <!-- '일' 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType1"
              id="day"
              autocomplete="off"
            />
            <label class="btn btn-primary" for="day">일</label>
          </div>
          <!-- 날짜필터2-달력버튼 -->
          <hr />
          <div class="btn-box callendar-group">
            <input type="date" id="start" name="date-start" value="">
            <label for="dae"></label>
          </div>
          <hr>
          <!-- 카테고리필터1:수입(default active)체크박스 : 월급/ 금융수입/ 용돈/ 이월/ 기타  -->
          <div class="checkbox--category btn-group checkbox--income ">
            <input type="checkbox" class="btn-check" id="salary" autocomplete="off"> <!-- 월급 -->
            <label class="btn btn-primary" for="salary">월급</label>
            <input type="checkbox" class="btn-check" id="finance" autocomplete="off"> <!-- 금융수입 -->
            <label class="btn btn-primary" for="finance">금융수입</label>
            <input type="checkbox" class="btn-check" id="alowance" autocomplete="off"> <!-- 용돈 -->
            <label class="btn btn-primary" for="alowance">용돈</label>
            <input type="checkbox" class="btn-check" id="carryover" autocomplete="off"> <!-- 이월 -->
            <label class="btn btn-primary" for="carryover">이월</label>
            <input type="checkbox" class="btn-check" id="miscIncome" autocomplete="off">  <!-- 기타-수입 -->
            <label class="btn btn-primary" for="miscIncome">기타</label>
          </div>
          <!-- 카테고리필터2:지출-체크박스                : 식비/저축/교통비/문화생활/생필품/쇼핑 -->
          <div class="checkbox--category btn-group checkbox--expense ">
            <input type="checkbox" class="btn-check" id="foodcost" autocomplete="off"> <!-- 식비 -->
            <label class="btn btn-primary" for="foodcost">식비</label>
            <input type="checkbox" class="btn-check" id="saving" autocomplete="off"> <!-- 저축 -->
            <label class="btn btn-primary" for="saving">저축</label>
            <input type="checkbox" class="btn-check" id="transport" autocomplete="off"> <!-- 교통비 -->
            <label class="btn btn-primary" for="transport">교통비</label>
            <input type="checkbox" class="btn-check" id="culture" autocomplete="off"> <!-- 문화생활 -->
            <label class="btn btn-primary" for="culture">문화생활</label>
            <input type="checkbox" class="btn-check" id="essential" autocomplete="off"> <!-- 생필품 -->
            <label class="btn btn-primary" for="essential">생필품</label>
            <input type="checkbox" class="btn-check" id="shopping" autocomplete="off"> <!-- 쇼핑 -->
            <label class="btn btn-primary" for="shopping">쇼핑</label>
            <input type="checkbox" class="btn-check" id="miscExpense" autocomplete="off">  <!-- 기타-지출 -->
            <label class="btn btn-primary" for="miscExpense">기타</label>
          </div>
          <hr>
          <!-- 분류필터 수입/지출 Radio버튼-->
          <!-- 라디오 토글 버튼 그룹:수입/지출 -->
          <div class="btn-group income-expense-group" role="group" aria-label="수입/지출 선택">
           <!-- 수입 라디오 버튼 (기본 선택) -->
           <input
              type="radio"
              id="typeIncome" 
              value="expense" 
              class="btn-check" 
              name="transactionType2"  
              autocomplete="on" 
             />
           <label class="btn btn-primary" for="typeincome">수입</label>
            <!-- 지출 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType2"
              id="expense"
              autocomplete="off"
            />
            <label class="btn btn-primary" for="expense">지출</label>
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
              autocomplete="on" 
            />
           <label class="btn btn-primary" for="cash">현금</label>
            <!-- 카드 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType3"
              id="card"
              autocomplete="off"
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
  overflow: scroll;

  width: 37.5rem;    /* 600px */
  height: 31.25rem;  /* 500px */

  background-color:var(--color-white) ;
}
.callendar-group{
  border: 1px var(--color--gray-light) solid;
}
.checkbox--category{
  width: 27.813rem;  /* 445px */
  height: 7.375rem;  /* 118px */

}
.modal-body .checkbox--expense{
  display: none;
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
