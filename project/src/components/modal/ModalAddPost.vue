<template>
  <div
    class="modal fade"
    id="ModalAddPost"
    tabindex="-1"
    aria-labelledby="ModalAddPostLabel"
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
                  <option value="salary">🟣월급</option>
                  <option value="finance">🟣금융 수입</option>
                  <option value="allowance">🟣용돈</option>
                  <option value="carryover">🟣이월</option>
                  <option value="miscIncome">🟣기타</option>
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
                <label for="payment-method" class="col-form-label">결제방식</label>
                <input
                  type="text"
                  id="payment-method"
                  class="form-control"
                  v-model="paymentMethod"
                  placeholder="예: 카드, 현금 등"
                  style="text-align: right"
                />
              </div>
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
                  <option value="foodcost">🟣식비</option>
                  <option value="saving">🟣저축</option>
                  <option value="transport">🟣교통비</option>
                  <option value="culture">🟣문화생활</option>
                  <option value="essentials">🟣생필품</option>
                  <option value="shopping">🟣쇼핑</option>
                  <option value="miscExpense">🟣기타</option>
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
          <button type="button" class="btn btn-primary" @click="submitTransaction">완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const store = useTransactionStore()

const activeTab = ref('income')
const selectedDate = ref('')
const title = ref('')
const amount = ref('0원')
const memo = ref('')
const categoryIncome = ref('')
const categoryExpense = ref('')
const paymentMethod = ref('')

const handleFocus = () => {
  if (amount.value === '0원') amount.value = ''
}
const handleBlur = () => {
  if (amount.value.trim() === '') amount.value = '0원'
}
const formatAmount = (e) => {
  const raw = e.target.value.replace(/[^0-9]/g, '')
  if (!raw) {
    amount.value = ''
    return
  }
  amount.value = Number(raw).toLocaleString()
}

const resetForm = () => {
  selectedDate.value = ''
  title.value = ''
  amount.value = '0원'
  memo.value = ''
  categoryIncome.value = ''
  categoryExpense.value = ''
  activeTab.value = 'income'
  paymentMethod.value = ''
}

const getKoreanDay = (dateObj) => {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return days[dateObj.getDay()]
}

const submitTransaction = async () => {
  const parsedAmount = parseInt(amount.value.replace(/,/g, '')) || 0
  const category = activeTab.value === 'income' ? categoryIncome.value : categoryExpense.value

  if (!selectedDate.value || !title.value || !parsedAmount || !category) {
    alert('모든 필드를 입력해주세요.')
    return
  }

  const dateObj = new Date(selectedDate.value)
  const isValidDate = !isNaN(dateObj.getTime())

  if (!isValidDate) {
    alert('유효한 날짜를 선택해주세요.')
    return
  }

  const lastId = store.transactions.length
    ? Math.max(...store.transactions.map((t) => Number(t.id)))
    : 0

  const newTransaction = {
    id: String(lastId + 1),
    amount: parsedAmount,
    category,
    merchant: title.value,
    memo: memo.value,
    userId: 1,
    dateYear: dateObj.getFullYear(),
    dateMonth: dateObj.getMonth() + 1,
    dateDay: dateObj.getDate(),
    dayOfWeek: getKoreanDay(dateObj),
    isIncome: activeTab.value === 'income',
    paymentMethod: activeTab.value === 'income' ? '' : paymentMethod.value,
    date: selectedDate.value,
  }

  await store.addTransaction(newTransaction)
  resetForm()
}
</script>

<style scoped>
.mb-3 {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.col-form-label {
  padding: 0 0.5rem 0 1.5rem;
  color: var(--color-black);
  width: 6rem; /* 라벨 너비 고정 */
}

.mb-3 input,
.mb-3 select,
.mb-3 textarea {
  width: 20rem;
  margin-left: 1rem;
}

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
.modal-header .btn-primary {
  margin: 0 1rem 0 0;
}
.mb-3 {
  display: flex;
}
.form-control,
.form-select {
  margin: 0;
  width: 20rem; /* 너비 동일하게 */
}
.modal-footer .btn,
.modal-header .btn {
  background-color: var(--color-white);
  color: var(--color-black);
  border: 1px solid var(--color-gray-light);
  width: 5rem;
}
.modal-footer .btn:hover,
.modal-header .btn:hover {
  background-color: var(--color-purple9);
  color: var(--color-white);
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
