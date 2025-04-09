<template>
  <!-- 수입 버튼 -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#ModalImport"
  >
    +수입
  </button>

  <!-- 수입 모달 -->
  <div
    class="modal fade"
    id="ModalImport"
    tabindex="-1"
    aria-labelledby="incomeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <p id="nowdate">{{ formattedDate }}</p>
          <span class="category-name">카테고리명</span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- 모달 본문 -->
        <div class="modal-body">
          <div class="income-item">
            <div class="left">
              <div class="title">수입 내역</div>
            </div>
            <div class="right">
              <div class="amount">
                <span class="plus">+ 50,000</span>
                <span class="unit">원</span>
              </div>
              <div class="method">카드</div>
            </div>
          </div>
          <div class="memo-group">
            <label for="message-text" class="col-form-label">메모</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </div>
        <!-- 모달 푸터 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-frist">수정</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 요일 배열
const days = ['일', '월', '화', '수', '목', '금', '토']

// 현재 날짜 객체 생성 및 포맷팅
const now = new Date()
const year = now.getFullYear()
const month = String(now.getMonth() + 1).padStart(2, '0')
const date = String(now.getDate()).padStart(2, '0')
const day = days[now.getDay()]

// 포맷팅된 날짜 문자열 (예: 2025.04.09(수))
const formattedDate = ref(`${year}.${month}.${date}(${day})`)
</script>

<style scoped>
/* 모달 콘텐츠 크기 설정 */
.modal-content {
  width: 37.5rem;
  height: 31.25rem;
}

/* 날짜 및 모달 헤더 스타일 */
#nowdate {
  margin: 1rem;
}

.modal-header,
.modal-footer {
  border: 0;
  display: flex;
  align-items: center;
}

.category-name {
  font-size: 16px;
  color: #333;
  margin: 0 1rem;
}

/* 모달 닫기 버튼 오른쪽 정렬 */
.modal-header .btn-close {
  margin-left: auto;
}

/* 모달 본문 여백 */
.modal-body {
  margin: 1rem;
}

/* 수입 내역 항목 레이아웃 */
.income-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
}

.left .title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.right {
  text-align: right;
}

.amount {
  font-size: 18px;
  font-weight: 600;
}

.amount .plus {
  color: #4a90e2; /* 수입 금액 강조 컬러 */
}

.amount .unit {
  color: #000;
}

.method {
  font-size: 14px;
  color: #888;
  margin-top: 4px;
}

/* 메모 입력 영역 */
.memo-group {
  margin-top: 1rem;
}

.form-control {
  width: 30rem;
  margin-left: 3rem;
  resize: none;
  height: 10rem;
}

/* 모달 내부 버튼 스타일 */
.modal-footer .btn,
.modal-header .btn {
  background-color: #fafafa;
  color: #535353;
  border: 0.1rem solid #e4e4e4;
  width: 5rem;
}

.modal-header .btn-primary {
  background-color: #8d92f2;
  color: #fafafa;
}

.modal-footer .btn-primary {
  color: red;
}

/* 선택 박스 스타일 (필요 시) */
.form-select {
  width: 22rem;
  margin-left: 1rem;
}
/*  */
.modal-footer button {
  margin: 0 0 rem 0;
}
/*  */
</style>
