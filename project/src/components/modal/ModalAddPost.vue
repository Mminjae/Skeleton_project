<template>
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@mdo"
  >
    생성
  </button>

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- 라디오 토글 버튼 그룹 -->
          <div class="btn-group" role="group" aria-label="수입/지출 선택">
            <!-- 수입 라디오 버튼 (기본 선택) -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType"
              id="income"
              autocomplete="on"
              checked
            />
            <label class="btn btn-primary" for="income">수입</label>

            <!-- 지출 라디오 버튼 -->
            <input
              type="radio"
              class="btn-check"
              name="transactionType"
              id="expense"
              autocomplete="off"
            />
            <label class="btn btn-light" for="expense">지출</label>
          </div>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">날짜</label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">내역</label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">금액</label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>
            <div class="mb-3">
              <label for="form-select" class="col-form-label">카테고리</label>
              <select class="form-select" aria-label="Default select example">
                <option selected></option>
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
              <label for="message-text" class="col-form-label">메모</label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">초기화</button>
          <button type="button" class="btn btn-primary">완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-dialog .btn {
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
  background-color: #fafafa;
  color: #535353;
  border: #e4e4e4 0.1rem solid;
  width: 5rem;
}

.modal-header .btn-primary {
  background-color: #8d92f2;
  color: #fafafa;
}
</style>
