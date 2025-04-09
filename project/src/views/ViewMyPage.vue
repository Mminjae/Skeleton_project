<script setup>
// import { ref } from 'vue'
</script>

<template>
  <main>
    <div id="maypage">
      <h3>마이페이지</h3>
      <div class="mypage-form">
        <!-- 회원정보 -->
        <div>
          <section class="mypage-member">
            <h5 class="highlight">회원정보</h5>
            <div class="member-info">
              <span class="member-info_name">이름</span>
              <span class="member-info_name">{{}}</span>
            </div>
            <div>
              <span class="member-info_birth">생년월일</span>
              <span class="member-info_birth">{{}}</span>
            </div>
            <div>
              <span class="member-info_username">ID</span>
              <span class="member-info_username">{{}}</span>
            </div>
          </section>
        </div>
        <!-- 프로필 사진 -->
        <img class="profile-picture" src="../assets/imgs/quokka.webp" alt="프로필" />
      </div>

      <!-- 연락처 정보 -->
      <div class="mypage-form">
        <section class="mypage-member">
          <h5 highlight>연락처정보</h5>
          <div class="member-info">
            <span class="member-info_email">이메일</span>
            <span>{{}}</span>
          </div>
          <div class="member-info">
            <span class="member-info_phone">전화번호</span>
            <span>{{}}</span>
          </div>
        </section>
      </div>
      <div class="btn-clicked">
        <button class="modify-info">수정</button>
        <button class="member-out">회원탈퇴</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
* {
  font: 1rem;
  font-weight: 600;
  color: #535353;
}
#maypage {
  border: 1px solid black;
  width: 40rem;
  height: 30em;
}
.mypage-form {
  border: 1px solid red;
  display: flex;
  margin: 2rem;
  display: flex;
  justify-content: space-between;
  margin: 3rem;
}

.highlight {
}

.profile-picture {
  width: 4rem;
  height: 4rem;
  border-radius: 40%;
  text-align: right;
  margin: 1rem;
}

.mypage-member * {
  margin: 0.5rem;
}

.btn-clicked {
  display: flex;
  justify-content: right;
}
.btn-clicked * {
  margin: 0.5rem;
  padding: 0.2rem;
  border-radius: 25%;
  background-color: #fafafa;
}
</style>
