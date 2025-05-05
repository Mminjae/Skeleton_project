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
        <!-- 모달 헤더 -->
        <div class="modal-header">
          <div class="header-left">
            <div class="icon-box">
              <IconIcon
                :icon="item?.category"
                size="36"
                class="category-icon"
              />
              <span class="category-text">{{ item?.category }}</span>
            </div>
          </div>
          <div class="header-right">
            <span class="date-text">
              {{ item?.dateYear }}.{{ item?.dateMonth }}.{{ item?.dateDay }}
              ({{ item?.dayOfWeek }})
            </span>
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
            <div class="title">{{ item?.merchant }}</div>
            <div class="amount">
              <span :class="item?.isIncome ? 'plus' : 'minus'">
                {{ item?.isIncome ? '+' : '-' }} {{ item?.amount?.toLocaleString() }}
              </span>
              <span class="unit">원</span>
            </div>
          </div>

          <div class="memo-group">
            <label class="memo-label">메모</label>
            <hr />
            <p>{{ item?.memo }}</p>
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
import IconIcon from '@/components/base/iconIcon.vue'

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
})
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
</style>