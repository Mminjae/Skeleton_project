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
              <div class="value">{{ item.value }}</div>
            </div>
          </div>

          <!-- 프로필 -->
          <div>
            <img src="" alt="프로필" class="profile-img" />
            <i class="bi bi-person-fill"></i>
          </div>
        </div>

        <div class="section-divider"></div>

        <!-- 연락처 정보 -->
        <div class="info-contact">
          <div class="info-title">연락처정보</div>
          <div class="info-item" v-for="(item, index) in contactInfo" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ButtonEdit />
  <ButtonDelete />
  <!-- 탈퇴 모달 -->
  <ModalDelete />
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import ModalDelete from '@/components/modal/ModalDelete.vue'
import ButtonDelete from '@/components/base/ButtonDelete.vue'
import ButtonEdit from '@/components/base/ButtonEdit.vue'

// 로그인 된 정보 가져오기
const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
})

const memberInfo = computed(() => userStore.memberInfo)
const contactInfo = computed(() => userStore.contactInfo)
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

.label {
  border-right: 4px solid #d5d7f2;
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
  width: 6rem;
  height: 6rem;
  background-color: #e6f0ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin-right: 2rem;
  margin-top: 2rem;
}

.label,
.value {
  padding: 0.5rem;
}
/* 회원정보, 연락처 정보 경계선 */
.section-divider {
  border-top: 1px solid #eee;
  margin: 6rem 0;
  padding-top: 0;
}
/* 수정, 탈퇴 버튼 */
/* .btn-group {
  display: flex;
  justify-self: flex-end;
  gap: 1rem;
  margin-top: 3.5rem;
  width: 10rem;
  height: 2.5rem;
}

button {
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  background: white;
  color: #535353;
  cursor: pointer;
  transition: 0.3s;
}
.edit {
  width: 5rem;
  margin-right: 1rem;
}
.member-out {
  width: 7rem;
  border: none;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
} */

/* 탈퇴 클릭 시 모달 */
/* .modal {
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

.modal-footer {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
} */
</style>
