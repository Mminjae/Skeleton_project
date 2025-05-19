<template>
  <div
    class="modal fade"
    id="ModalImport"
    tabindex="-1"
    aria-labelledby="ModalImportLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- 주성 수정✅ item이 존재할 때만 렌더링  템플릿으로 한 번 더 묶음-->
        <template v-if="item">
          <!-- 읽기 전용 뷰 -->
          <template v-if="!isEditing">
            <div class="modal-header">
              <div class="header-left">
                <div class="icon-box">
                  <IconIcon :icon="item.category" size="36" />
                  <span class="category-text">
                    {{ categoryMapReverse[item.category] || item.category }}
                  </span>
                </div>
              </div>
              <div class="header-right">
                <span class="date-text">
                  {{ item.dateYear }}.{{ item.dateMonth }}.{{ item.dateDay }} ({{ item.dayOfWeek }})
                </span>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>

            <div class="modal-body">
              <div class="title-row">
                <div class="title">{{ item.merchant }}</div>
                <div class="amount">
                  <span :class="item.isIncome ? 'plus' : 'minus'">
                    {{ item.isIncome ? '+' : '-' }}
                    {{ item.amount.toLocaleString() }}
                  </span>
                  <span class="unit">원</span>
                </div>
              </div>
              <div class="memo-group">
                <label class="memo-label">메모</label>
                <hr />
                <p>{{ item.memo }}</p>
              </div>
            </div>

            <div class="modal-footer justify-content-end">
              <button type="button" class="btn btn-outline-secondary" @click="onEdit">수정</button>
              <button type="button" class="btn btn-outline-danger" @click="onDelete">삭제</button>
            </div>
          </template>

          <!-- 수정 뷰 -->
          <template v-else>
            <div class="modal-header">
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
              <button type="button" class="btn-close" aria-label="Close" @click="onClose"></button>
            </div>

            <div class="modal-body">
              <form @submit.prevent="onSave">
                <div class="mb-3">
                  <label class="col-form-label">날짜</label>
                  <input type="date" class="form-control" v-model="selectedDate" />
                </div>
                <div class="mb-3">
                  <label class="col-form-label">내역</label>
                  <input type="text" class="form-control text-end" v-model="title" />
                </div>

                <template v-if="activeTab === 'income'">
                  <div class="mb-3">
                    <label class="col-form-label">금액</label>
                    <input
                      type="text"
                      class="form-control text-end"
                      v-model="amount"
                      inputmode="numeric"
                      @input="formatAmount"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      placeholder="0원"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="col-form-label">카테고리</label>
                    <select class="form-select" v-model="categoryIncome">
                      <option value="">선택</option>
                      <option value="월급">🟣월급</option>
                      <option value="금융 소득">🟣금융 소득</option>
                      <option value="용돈">🟣용돈</option>
                      <option value="이월">🟣이월</option>
                      <option value="기타">🟣기타</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="col-form-label">메모</label>
                    <textarea class="form-control" v-model="memo"></textarea>
                  </div>
                </template>

                <template v-else>
                  <div class="mb-3">
                    <label class="col-form-label">금액</label>
                    <input
                      type="text"
                      class="form-control text-end"
                      v-model="amount"
                      inputmode="numeric"
                      @input="formatAmount"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      placeholder="0원"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="col-form-label">카테고리</label>
                    <select class="form-select" v-model="categoryExpense">
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
                    <label class="col-form-label">메모</label>
                    <textarea class="form-control" v-model="memo"></textarea>
                  </div>
                </template>
              </form>
            </div>

            <div class="modal-footer justify-content-end">
              <button type="button" class="btn btn-secondary" @click="resetForm">초기화</button>
              <button type="button" class="btn btn-primary" @click="onSave">완료</button>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Modal } from 'bootstrap'
import { defineProps, defineEmits } from 'vue'
import { useTransactionStore } from '@/stores/useTransactionStore'
import IconIcon from '@/components/base/iconIcon.vue'

const props = defineProps({
  item: { type: Object, required: true },
})
const emit = defineEmits(['close'])

const transactionStore = useTransactionStore()

// 모달 카테고리명 영어 --> 한글 변경
const categoryMapReverse = {
  // 수입
  salary: '월급',
  finance: '금융 소득',
  allowance: '용돈',
  carryover: '이월',
  miscIncome: '기타',
  // 지출
  foodcost: '식비',
  saving: '저축',
  transport: '교통비',
  culture: '문화생활',
  essentials: '생필품',
  shopping: '쇼핑',
  miscExpense: '기타',
}

// 편집 모드 토글 및 초기화
const isEditing = ref(false)
const activeTab = ref('expense')
const selectedDate = ref('')
const title = ref('')
const amount = ref('0원')
const memo = ref('')
const categoryIncome = ref('')
const categoryExpense = ref('')

function onEdit() {
  isEditing.value = true
  activeTab.value = props.item.isIncome ? 'income' : 'expense'
  // 날짜 세팅 (yyyy-MM-dd)
  const Y = String(props.item.dateYear).padStart(4, '0')
  const M = String(props.item.dateMonth).padStart(2, '0')
  const D = String(props.item.dateDay).padStart(2, '0')
  selectedDate.value = `${Y}-${M}-${D}`

  title.value = props.item.merchant
  amount.value = props.item.amount.toLocaleString()
  memo.value = props.item.memo || ''
  if (props.item.isIncome) {
    categoryIncome.value = props.item.category
    categoryExpense.value = ''
  } else {
    categoryExpense.value = props.item.category
    categoryIncome.value = ''
  }
}

// 삭제
function onDelete() {
  axios
    .delete(`http://localhost:3000/transactions/${props.item.id}`)
    .then(() => {
      transactionStore.fetchTransactions()
      hideModal()
      emit('close')
    })
    .catch((err) => console.error(err))
}

// 수정(저장)
function onSave() {
  const [Y, M, D] = selectedDate.value.split('-')

  // ✅ 유효성 검사
  if (
    !selectedDate.value ||
    !title.value.trim() ||
    !amount.value.replace(/,/g, '') ||
    (activeTab.value === 'income' && !categoryIncome.value) ||
    (activeTab.value === 'expense' && !categoryExpense.value)
  ) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  // ✅ 한글 → 영문 카테고리 매핑
  const categoryMap = {
    // 수입
    월급: 'salary',
    '금융 소득': 'finance',
    용돈: 'allowance',
    이월: 'carryover',
    기타: 'miscIncome',
    // 지출
    식비: 'foodcost',
    저축: 'saving',
    교통비: 'transport',
    문화생활: 'culture',
    생필품: 'essentials',
    쇼핑: 'shopping',
    기타: 'miscExpense',
  }

  const selectedCategory =
    activeTab.value === 'income' ? categoryIncome.value : categoryExpense.value
  const mappedCategory = categoryMap[selectedCategory] || selectedCategory

  const payload = {
    ...props.item,
    dateYear: Number(Y),
    dateMonth: Number(M),
    dateDay: Number(D),
    date: `${Y}-${M}-${D}`,
    merchant: title.value,
    amount: Number(amount.value.replace(/,/g, '')),
    memo: memo.value,
    category: mappedCategory, // ✅ 변환된 영문 카테고리 저장
    isIncome: activeTab.value === 'income',
  }

  axios
    .put(`http://localhost:3000/transactions/${props.item.id}`, payload)
    .then(() => {
      transactionStore.fetchTransactions()
      hideModal()
      emit('close')
    })
    .catch((err) => console.error(err))
}

// 모달 닫기
function hideModal() {
  const el = document.getElementById('ModalImport')
  const ins = Modal.getInstance(el) || new Modal(el)
  ins.hide()
}

// 닫기 버튼
function onClose() {
  hideModal()
  emit('close')
}

// 폼 초기화
function resetForm() {
  // 강제로 리셋
  selectedDate.value = '0'
  title.value = ''
  amount.value = '0원'
  memo.value = ''
  categoryIncome.value = ''
  categoryExpense.value = ''
}

// 금액 입력 핸들러
const handleFocus = () => {
  if (amount.value === '0원') amount.value = ''
}
const handleBlur = () => {
  if (!amount.value.trim()) amount.value = '0원'
}
function formatAmount(e) {
  const raw = e.target.value.replace(/[^0-9]/g, '')
  amount.value = raw ? Number(raw).toLocaleString() : ''
}
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
  padding-top: 0;
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
  color: var(--color-blue);
}
.amount .minus {
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
  border: 1px solid var(--color-gray-light);
  margin-left: 0.5rem;
}
.btn-outline-danger {
  color: red;
}
.btn:hover {
  background-color: var(--color-purple9);
  color: var(--color-white);
}

.tab-button {
  padding: 0.4rem 1.5rem;
  margin-right: 0.5rem;
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
  color: #fff;
  border-color: transparent;
}

.mb-3 {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.col-form-label {
  padding: 0 0.5rem 0 1.5rem;
  color: var(--color-black);
  width: 4rem;
}
.form-control,
.form-select {
  width: 20rem;
  margin-left: 1rem;
}
.form-control.text-end {
  text-align: right;
}
textarea.form-control {
  height: 80px;
}
.btn-close {
  padding-right: 2rem;
}
</style>
