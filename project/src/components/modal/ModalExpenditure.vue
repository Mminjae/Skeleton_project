<template>
  <!-- 지출 버튼 -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#ModalExpenditure"
  >
    -지출
  </button>

  <!-- 지출 모달 -->
  <div
    class="modal fade"
    id="ModalExpenditure"
    tabindex="-1"
    aria-labelledby="expenseModalLabel"
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
          <div class="expense-item">
            <div class="item-left">
              <div class="title">지출 내역</div>
            </div>
            <div class="item-right">
              <div class="amount">
                <span class="minus">- 50,000</span>
                <span class="unit">원</span>
              </div>
              <div class="method">카드</div>
            </div>
          </div>
          <div class="memo-group">
            <label for="memo-text" class="col-form-label">메모</label>
            <textarea class="form-control" id="memo-text"></textarea>
          </div>
        </div>
        <!-- 모달 푸터 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">수정</button>
          <button type="button" class="btn btn-primary">삭제</button>
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
const formattedDate = ref(`${year}.${month}.${date}(${day})`)
</script>

<style scoped>
/* 모달 내부 공통 스타일 */
.modal-header,
.modal-footer {
  border: 0;
  display: flex;
  align-items: center;
}

/* 날짜 표시 위치 및 스타일 */
#nowdate {
  margin: 1rem;
  font-weight: 500;
}

/* 카테고리명 스타일 */
.category-name {
  font-size: 16px;
  color: #333;
  margin: 0 1rem;
}

/* 모달 닫기 버튼 오른쪽 정렬 */
.modal-header .btn-close {
  margin-left: auto;
}

/* 지출 항목 영역 */
.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
}

.item-left .title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* 오른쪽 내용 정렬 */
.item-right {
  text-align: right;
}

.amount {
  font-size: 18px;
}

.amount .minus {
  color: #e74c3c;
}

.amount .unit {
  color: #000;
}

.method {
  font-size: 14px;
  color: #888;
  margin-top: 4px;
}

/* 메모 그룹 */
.memo-group {
  margin-top: 1rem;
}

.form-control {
  width: 100%;
  resize: none;
  height: 10rem;
  margin-top: 0.5rem;
}

/* 모달 내부 버튼 스타일 */
.modal-footer .btn,
.modal-header .btn {
  background-color: #fafafa;
  color: #535353;
  border: 1px solid #e4e4e4;
  width: 5rem;
}

.modal-header .btn-primary {
  background-color: #8d92f2;
  color: #fafafa;
}

.modal-footer .btn-primary {
  color: red;
}

/* 폼 그룹 (선택적으로 재사용 가능) */
.mb-3 {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

/* 선택 박스 (참고용) */
.form-select {
  width: 100%;
  margin-top: 0.5rem;
}
</style>
