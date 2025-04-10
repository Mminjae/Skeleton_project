<template>
  <div class="wrapper">
    <!-- 대시보드 영역 -->
    <div class="container">
      <div class="row">
        <div class="co1">
          <img src="https://ifh.cc/g/lC7nmQ.png" alt="그래프이미지" />
        </div>
        <div class="co2">
          <img src="https://ifh.cc/g/pjlHvn.png" alt="최근거래내역이미지" />
        </div>
      </div>
      <div class="row">
        <div class="co3">
          <img src="https://ifh.cc/g/fL8hMh.png" alt="수입지출그래프이미지" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체를 좌우로 정렬하는 래퍼 */
.wrapper {
  display: flex;
  align-items: flex-start;
}

/* 대시보드 전체 박스 */
.container {
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1rem;
}

/* 줄 단위 */
.row {
  display: flex;
  gap: 2rem;
}

/* 카드 스타일 */
.co1,
.co2,
.co3 {
  padding: 0;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 15px var(--color-black);
  overflow: hidden;
}

.co1 {
  width: 42rem;
  height: 31rem;
}

.co2 {
  width: 30rem;
  height: 31rem;
}

.co3 {
  width: 74rem;
  height: 29rem;
}

/* 이미지 꽉 차게 */
img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  display: block; /* ✅ 인라인 여백 제거 */
  vertical-align: middle; /* ✅ 라인 높이 여백 제거 */
}
</style>
