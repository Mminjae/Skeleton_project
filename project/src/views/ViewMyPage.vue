<template>
  <div class="side-bar"></div>
  <div class="container my-5">
    <h5 class="mb-4">마이페이지</h5>
    <div class="info-card">
      <div class="d-flex justify-content-between align-items-start mb-4">
        <!-- 회원 정보 -->
        <div class="info-member">
          <div class="info-title">회원정보</div>
          <div class="info-item" v-for="(item, index) in memberInfo" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="bar"></div>
            <div class="value">{{ item.value }}</div>
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
          <div class="bar"></div>
          <div class="value">{{ item.value }}</div>
        </div>
      </div>
      <!-- 수정/탈퇴 버튼 -->
      <div class="d-flex justify-content-end mt-4">
        <button class="btn btn-outline-secondary me-2" @click="onEdit">수정</button>
        <button class="btn btn-outline-danger" @click="onDelete">회원 탈퇴</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const memberInfo = ref([
  { label: '이름', value: 'ㅇㅇㅇ' },
  { label: '생년월일', value: '2021.2.17' },
  { label: 'ID', value: 'qwerty' },
])

const contactInfo = ref([
  { label: '이메일', value: 'qwerty@gmail.com' },
  { label: '전화번호', value: '010-1234-5678' },
])

const onEdit = () => {
  alert('수정 버튼 클릭됨!')
}

const onDelete = () => {
  if (confirm('정말로 탈퇴하시겠습니까?')) {
    alert('탈퇴 처리 중...')
  }
}
</script>

<style scoped>
/* 회원, 연락처 정보, 프로필 */
.info-card {
  width: 29.4rem; /* 470px*/
  height: 25rem; /* 400px */
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  background-color: white;
}
/* 회원 정보 */
.info-title {
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 1rem;
  border-left: 3px solid #d0d0ff;
  padding-left: 0.5rem;
}
.info-member {
  width: 10.3rem; /* 164.8px */
  height: 9rem; /* 144px */
}
/* 연락처 정보 */
.info-contact {
  width: 14.5rem; /* 231px */
  height: 102px;
}
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
}

.info-item .label {
  width: 80px;
  color: #555;
  font-weight: 500;
}

.info-item .bar {
  width: 4px;
  height: 18px;
  background-color: #d0d0ff;
  margin: 0 12px;
}

.info-item .value {
  flex: 1;
  color: #333;
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
  font-size: 24px;
  color: #6c757d;
}

.section-divider {
  border-top: 1px solid #eee;
  margin: 1.5rem 0;
}
</style>
