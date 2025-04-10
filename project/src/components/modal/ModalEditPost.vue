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
    aria-labelledby="ModalEditPostLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <!-- 탭 버튼 -->
          <button
            :class="['tab-button', activeTab === 'income' ? 'active' : '']"
            @click="activeTab = 'income'"
          >
            수입
          </button>
          <button
            :class="['tab-button', activeTab === 'expense' ? 'active' : '']"
            @click="activeTab = 'expense'"
          >
            지출
          </button>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form>
            <!-- 공통 영역 -->
            <div class="mb-3">
              <label for="date" class="col-form-label">날짜</label>
              <input type="date" class="form-control" id="date" v-model="selectedDate" />
            </div>
            <div class="mb-3">
              <label for="title" class="col-form-label">내역</label>
              <input
                type="text"
                class="form-control"
                id="title"
                style="text-align: right"
                v-model="title"
              />
            </div>

            <!-- 수입 탭 -->
            <template v-if="activeTab === 'income'">
              <div class="mb-3">
                <label for="amount-income" class="col-form-label">금액</label>
                <input
                  type="text"
                  class="form-control"
                  style="text-align: right"
                  v-model="amount"
                  inputmode="numeric"
                  @input="formatAmount"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  placeholder="0원"
                />
              </div>
              <div class="mb-3">
                <label for="category-income" class="col-form-label">카테고리</label>
                <select class="form-select" id="category-income" v-model="categoryIncome">
                  <option value="" selected>선택</option>
                  <option value="월급">🟣월급</option>
                  <option value="금융 수입">🟣금융 수입</option>
                  <option value="용돈">🟣용돈</option>
                  <option value="이월">🟣이월</option>
                  <option value="기타">🟣기타</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="memo-income" class="col-form-label">메모</label>
                <textarea class="form-control" id="memo-income" v-model="memo"></textarea>
              </div>
            </template>

            <!-- 지출 탭 -->
            <template v-else>
              <div class="mb-3">
                <label for="amount-expense" class="col-form-label">금액</label>
                <input
                  type="text"
                  class="form-control"
                  style="text-align: right"
                  v-model="amount"
                  inputmode="numeric"
                  @input="formatAmount"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  placeholder="0원"
                />
              </div>
              <div class="mb-3">
                <label for="category-expense" class="col-form-label">카테고리</label>
                <select class="form-select" id="category-expense" v-model="categoryExpense">
                  <option value="">선택</option>
                  <option value="식비">🟣식비</option>
                  <option value="저축">🟣저축</option>
                  <option value="교통비">🟣교통비</option>
                  <option value="문화생활">🟣문화생활</option>
                  <option value="생필품">🟣생필품</option>
                  <option value="쇼핑">🟣쇼핑</option>
                  <option value="기타">🟣기타</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="memo-expense" class="col-form-label">메모</label>
                <textarea class="form-control" id="memo-expense" v-model="memo"></textarea>
              </div>
            </template>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="resetForm">초기화</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('income')
const selectedDate = ref('')
const title = ref('')
const amount = ref('0원')
const memo = ref('')

// ✅ 탭별 카테고리를 따로 관리
const categoryIncome = ref('')
const categoryExpense = ref('')

// 금액 입력 포커스 핸들링
const handleFocus = () => {
  if (amount.value === '0원') {
    amount.value = ''
  }
}
const handleBlur = () => {
  if (amount.value.trim() === '') {
    amount.value = '0원'
  }
}

// ✅ 초기화 함수 수정
const resetForm = () => {
  selectedDate.value = ''
  title.value = ''
  amount.value = '0원'
  memo.value = ''
  categoryIncome.value = ''
  categoryExpense.value = ''
}

// 입력 시 숫자만 필터링하고 자동 포맷팅
const formatAmount = (e) => {
  const raw = e.target.value.replace(/[^0-9]/g, '') // 숫자만
  if (!raw) {
    amount.value = ''
    return
  }
  // 천 단위 쉼표 삽입
  amount.value = Number(raw).toLocaleString()
}
</script>

<style scoped>
.tab-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tab-button {
  padding: 0.4rem 1.5rem;
  margin: 2rem 0 0 1.2rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background-color: var(--color-white);
  color: #555;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.tab-button.active {
  background-color: var(--color-purple9);
  color: white;
  border-color: transparent;
}
.modal-header,
.modal-footer {
  border: 0;
}
.modal-footer .btn:hover,
.modal-header .btn:hover {
  background-color: var(--color-purple9);
  color: var(--color-white);
  width: 5rem;
}

.modal-header .btn-primary {
  margin: 0 1rem 0 0;
}
.mb-3 {
  display: flex;
}
.form-control {
  width: 22rem;
  margin: 0 0 0 3rem;
}

.form-select {
  width: 22rem;
  margin: 0 0 0 1rem;
}
.modal-footer .btn,
.modal-header .btn {
  background-color: var(--color-white);
  color: var(--color-black);
  border: 1px solid var(--color-gray-light);
  width: 5rem;
}

.modal-header {
  padding-top: 0;
}
.modal-footer {
  padding: 0 5% 5% 0;
}

.modal-header .btn-primary {
  background-color: var(--color-purple9);
  background-color: var(--color-white);
}

.col-form-label {
  padding: 0 0.5rem 0 1.5rem;
  color: var(--color-black);
}

.mb-3 {
  display: flex;
  align-items: center;
}
.mb-3 input, 
.mb-3 select,
.mb-3 textarea {
  width: 20rem;
}

.btn-close {
  padding-right: 2rem;
}
</style>
