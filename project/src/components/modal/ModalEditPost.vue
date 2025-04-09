<template>
  <!-- 수정 버튼 -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#ModalEditPost"
  >
    수정
  </button>

  <!-- 수정 모달 -->
  <div
    class="modal fade"
    id="ModalEditPost"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- 모달 헤더: 수입/지출 라디오 토글 및 닫기 버튼 -->
        <div class="modal-header">
          <div class="btn-group me-auto" role="group" aria-label="수입/지출 선택">
            <!-- 수입 라디오 버튼 (기본 선택) -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType"
              id="incomeRadio"
              autocomplete="on"
              checked
            />
            <label class="btn btn-primary" for="incomeRadio">수입</label>

            <!-- 지출 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType"
              id="expenseRadio"
              autocomplete="off"
            />
            <label class="btn btn-light" for="expenseRadio">지출</label>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- 모달 본문: 수정 폼 -->
        <div class="modal-body">
          <form @submit.prevent>
            <div class="mb-3">
              <label for="transaction-date" class="col-form-label">날짜</label>
              <input type="text" class="form-control" id="transaction-date" v-model="form.date" />
            </div>
            <div class="mb-3">
              <label for="transaction-description" class="col-form-label">내역</label>
              <input
                type="text"
                class="form-control"
                id="transaction-description"
                v-model="form.description"
              />
            </div>
            <div class="mb-3">
              <label for="transaction-amount" class="col-form-label">금액</label>
              <input
                type="text"
                class="form-control"
                id="transaction-amount"
                v-model="form.amount"
              />
            </div>
            <div class="mb-3">
              <label for="transaction-category" class="col-form-label">카테고리</label>
              <select class="form-select" id="transaction-category" v-model="form.category">
                <option value="" selected>선택</option>
                <option value="1">식비</option>
                <option value="2">저축</option>
                <option value="3">교통비</option>
                <option value="4">문화생활</option>
                <option value="5">생필품</option>
                <option value="6">쇼핑</option>
                <option value="9">월급</option>
                <option value="10">금융 수입</option>
                <option value="11">용돈</option>
                <option value="12">이월</option>
                <option value="13">기타</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="transaction-memo" class="col-form-label">메모</label>
              <textarea class="form-control" id="transaction-memo" v-model="form.memo"></textarea>
            </div>
          </form>
        </div>

        <!-- 모달 푸터: 초기화 및 삭제 버튼 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="resetForm">초기화</button>
          <button type="button" class="btn btn-primary" @click="openConfirmModal">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'

// 모달 인스턴스 변수
let confirmationModal = null
let editModalInstance = null

onMounted(() => {
  const bootstrap = window.bootstrap

  // 확인 모달 초기화 (HTML에 #staticBackdrop 요소가 있어야 함)
  confirmationModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))

  // 현재 수정 모달 인스턴스 가져오기
  editModalInstance = bootstrap.Modal.getInstance(document.getElementById('editModal'))
})

// form 데이터를 reactive 객체로 관리 (추후 유효성 검사, 전송 등에 활용 가능)
const form = reactive({
  date: '',
  description: '',
  amount: '',
  category: '',
  memo: '',
})

// 폼 초기화 함수
const resetForm = () => {
  form.date = ''
  form.description = ''
  form.amount = ''
  form.category = ''
  form.memo = ''
}

// 삭제 버튼 클릭 시 수정 모달 숨기고 확인 모달 표시
const openConfirmModal = () => {
  if (editModalInstance) {
    editModalInstance.hide()
  }
  if (confirmationModal) {
    confirmationModal.show()
  }
}
</script>

<style scoped>
/* 모달 헤더 및 푸터 경계선 제거 */
.modal-header,
.modal-footer {
  border: none;
}

/* 라디오 버튼 그룹 좌측 정렬 */
.btn-group.me-auto {
  margin-right: auto;
}

/* 폼 아이템 레이아웃 */
.mb-3 {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

/* 라벨과 입력창의 간격 조정 */
.col-form-label {
  margin-right: 1rem;
  width: 80px;
}

.form-control,
.form-select {
  flex: 1;
}

/* 모달 내 버튼 스타일 */
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
</style>
