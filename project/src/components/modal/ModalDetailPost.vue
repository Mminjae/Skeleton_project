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
          <button type="button" class="btn btn-primary">수입</button>
          <button type="button" class="btn btn-light">지출</button>
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
                <option value="7">기타</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">메모</label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">초기화</button>
          <button type="button" class="btn btn-primary">완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
