<template>
  <div id="mypage">
    <div class="container my-5">
      <h5 class="mb-5">마이페이지</h5>
      <div class="info-card">
        <div class="d-flex justify-content-between align-items-start mb-4">
          <!-- 회원 정보 -->
          <div class="info-member">
            <div class="info-title">회원정보</div>
            <div class="info-item" v-for="(item, index) in memberInfo" :key="index">
              <div class="label">{{ item.label }}</div>
              <div class="value">
                <input class="info-input" type="text" />
                <div v-if="item.error" class="error">{{ item.error }}</div>
              </div>
            </div>
          </div>

          <!-- 프로필 -->
          <div class="profile-img">
            <i class="bi bi-person-fill"></i>
          </div>
        </div>

        <div class="section-divider"></div>

        <!-- 연락처 정보 -->
        <div class="info-contact">
          <div class="info-title">연락처정보</div>
          <div class="info-item" v-for="(item, index) in contactInfo" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="value">
              <input class="info-input" type="text" />
            </div>
          </div>
        </div>
        <!-- 수정/탈퇴 버튼 -->
        <div class="btn-group">
          <button class="btn-edit" @click="goEdit">수정</button>
          <button class="btn-unregister" @click="showModal = true">회원 탈퇴</button>
        </div>
        <!-- 모달 -->
        <div class="modal" v-if="showModal">
          <div class="modal-content">
            <p>정말 탈퇴하시겠습니까?</p>
            <button @click="confirmDelete">네, 탈퇴할래요</button>
            <button @click="showModal = false">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const showModal = ref(false)

const goEdit = () => {
  alert('수정 되었습니다.')
}

const confirmDelete = () => {
  showModal.value = false
  alert('탈퇴 처리되었습니다.') // 실제론 API 호출
}

const memberInfo = ref([
  { label: '이름', value: 'ㅇㅇㅇ' },
  { label: '생년월일', value: '2021.2.17' },
  { label: 'ID', value: 'qwerty' },
])

const contactInfo = ref([
  { label: '이메일', value: 'qwerty@gmail.com' },
  { label: '전화번호', value: '010-1234-5678' },
])
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#mypage {
  font-family: 'Noto Sans KR', sans-serif;
  margin-left: 5rem;
  padding: 1rem;
  padding-top: 2rem;
}

/* 회원, 연락처 정보, 프로필 */
.info-card {
  width: 50rem; /*800px */
  height: 37.5rem; /* 600px */
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  padding: 2rem 5rem 0rem 2rem;
  margin: 1rem;
  background-color: white;
}
/* 회원 정보 */
.info-title {
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  width: 6rem;
  /* margin-top: 0rem; */
  background: linear-gradient(to top, #d5d7f2 30%, transparent 40%);
}

.info-member {
  width: 10.3rem; /* 164.8px */
  height: 9rem; /* 144px */
}

/* 연락처 정보 */
.info-contact {
  width: 24.6rem; /* 393px */
  height: 7rem; /* 102px */
}
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  margin-left: 2rem;
  width: 15rem;
}

.value {
  padding-left: 1rem;
}

.info-item .label {
  width: 80px;
  color: #535353;
  font-weight: 400;
}

.info-item .value {
  flex: 1;
  color: #535353;
}
/* 프로필 */
.profile-img {
  width: 80px;
  height: 80px;
  background-color: #e6f0ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.profile-img i {
  font-size: var(--font-xl);
  color: #535353;
}

.label,
.value {
  width: 10rem;
  padding: 0.5rem;
}

.info-input {
  height: 1.5rem;
}
/* 회원정보, 연락처 정보 경계선 */
.section-divider {
  border-top: 1px solid #eee;
  margin: 6rem 0;
  padding-top: 0;
}
/* 수정, 탈퇴 버튼 */
.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 2rem;
}

button {
  border: 1px solid #535353;
  /* padding: 4px 10px; */
  border-radius: 5px;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #f5f5f5;
}

.btn-edit {
  width: 3rem;
}
.btn-unregister {
  width: 5rem;
  color: red;
}

/* 탈퇴 클릭 시 모달 */
.modal {
  position: fixed;
  top: 10rem;
  left: 40rem;
  width: 20rem;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
}
</style>
