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
  <!-- 모달 -->
  <div
    class="modal fade"
    id="ModalExpenditure"
    tabindex="-1"
    aria-labelledby="ModalExpenditureLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <div class="header-left">
            <div class="icon-box">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18" cy="18" r="18" fill="#5D45DB" />
                <path
                  d="M21.25 16.9167V16.9267"
                  stroke="#FAFAFA"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.3333 8.25V12.3699C23.6741 13.1457 24.6949 14.3735 25.2128 15.8333H26.6656C26.9529 15.8333 27.2285 15.9475 27.4316 16.1506C27.6348 16.3538 27.7489 16.6293 27.7489 16.9167V19.0833C27.7489 19.3707 27.6348 19.6462 27.4316 19.8494C27.2285 20.0525 26.9529 20.1667 26.6656 20.1667H25.2118C24.8473 21.1963 24.2296 22.1176 23.4156 22.8457V25.0417C23.4156 25.4726 23.2444 25.886 22.9396 26.1907C22.6349 26.4955 22.2216 26.6667 21.7906 26.6667C21.3596 26.6667 20.9463 26.4955 20.6415 26.1907C20.3368 25.886 20.1656 25.4726 20.1656 25.0417V24.4101C19.8076 24.4701 19.4452 24.5001 19.0823 24.5H14.7489C14.3859 24.5001 14.0236 24.4701 13.6656 24.4101V25.0417C13.6656 25.4726 13.4944 25.886 13.1896 26.1907C12.8849 26.4955 12.4716 26.6667 12.0406 26.6667C11.6096 26.6667 11.1963 26.4955 10.8915 26.1907C10.5868 25.886 10.4156 25.4726 10.4156 25.0417V22.875L10.4167 22.8457C9.43519 21.9683 8.74331 20.8135 8.43259 19.5341C8.12186 18.2548 8.20695 16.9112 8.67658 15.6813C9.14621 14.4514 9.97824 13.3931 11.0626 12.6464C12.1469 11.8998 13.4324 11.5 14.7489 11.5H17.4573L22.3323 8.25H22.3333Z"
                  stroke="#FAFAFA"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="category-text">저축</span>
            </div>
          </div>
          <div class="header-right">
            <span class="date-text">{{ formattedDate }}</span>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>

        <!-- 모달 본문 -->
        <div class="modal-body">
          <div class="title-row">
            <div class="title">적금</div>
            <div class="amount"><span class="plus">- 10,000</span><span class="unit">원</span></div>
          </div>

          <div class="memo-group">
            <label class="memo-label">메모</label>
            <hr />
            <p>메모 내용</p>
          </div>
        </div>

        <!-- 모달 푸터 -->
        <div class="modal-footer justify-content-end">
          <button type="button" class="btn btn-outline-secondary">수정</button>
          <button type="button" class="btn btn-outline-danger">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const days = ['일', '월', '화', '수', '목', '금', '토']
const now = new Date()
const year = now.getFullYear()
const month = String(now.getMonth() + 1).padStart(2, '0')
const date = String(now.getDate()).padStart(2, '0')
const day = days[now.getDay()]
const formattedDate = ref(`${year}.${month}.${date}(${day})`)
</script>

<style scoped>
.modal-header,
.modal-body,
.modal-footer {
  border: 0;
}
.modal-content {
  width: 37.5rem;
  padding: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  border-bottom: none;
}

.icon-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-text {
  font-size: 16px;
  color: #333;
}

.date-text {
  font-size: 14px;
  color: #999;
  margin-right: 0.75rem;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.amount {
  font-size: 18px;
  font-weight: bold;
}

.amount .plus {
  color: var(--color-red);
}

.amount .unit {
  color: #000;
}

.memo-group {
  margin-top: 2rem;
}

.memo-label {
  font-size: 16px;
  color: #333;
}

.memo-display {
  margin-top: 1rem;
  font-size: 14px;
  color: #aaa;
}

.modal-footer .btn {
  width: 5rem;
  border: 1px solid #ccc;
  margin-left: 0.5rem;
}

.btn-outline-danger {
  color: red;
}
</style>
