<template>
  <div id="mypage">
    <h2>마이페이지</h2>
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
          <img src="@/assets/imgs/user-gray.svg" alt="프로필" class="profile-img" />
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
      <!-- 수정/탈퇴 버튼 -->
      <div class="btn-group">
        <button class="edit" @click="goEdit">수정</button>
        <button
          class="member-out"
          data-bs-toggle="modal"
          data-bs-target="#unregisterModal"
        >
          회원 탈퇴
        </button>
      </div>

      <!-- 탈퇴 클릭 시 모달 -->
      <div
        class="modal fade"
        id="unregisterModal"
        tabindex="-1"
        aria-labelledby="unregisterModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p class="fw-bold text-dark">정말 탈퇴하시겠습니까?</p>
            </div>
            <div class="modal-footer">
              <button type="button" data-bs-dismiss="modal">취소</button>
              <button
                type="button"
                class="member-out btn btn-danger"
                @click="confirmDelete"
                data-bs-dismiss="modal"
              >
                네, 탈퇴할래요
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore' // 또는 '../stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  userStore.fetchUser()
})

const memberInfo = computed(() => userStore.memberInfo)
const contactInfo = computed(() => userStore.contactInfo)

const goEdit = () => {
  router.push('/profileEdit')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#mypage {
  font-family: 'Noto Sans KR', sans-serif;
}
h2 {
  padding: var(--space-l) 0 var(--space-s) calc(var(--space-m) * 2.5);
  color: var(--color-black);
  font-size: var(--font-xl);
}

/* 회원, 연락처 정보, 프로필 */
.info-card {
  width: calc(var(--space-m) * 50);
  margin: var(--space-m) 0 0 calc(var(--space-m) * 5);
  padding: var(--space-xl);
  background: var(--color-white);
  border-radius: var(--space-m);
  box-shadow: 0 0 var(--space-m) rgba(0, 0, 0, 0.05);
  position: relative;
}
/* 회원 정보 */
.info-title {
  margin-bottom: 2rem;
  /* width: 7rem; */
  width: fit-content;
  padding: 0 0.5rem;
  color: var(--color-black);
  font-size: var(--font-l);
  font-weight: 500;
  background: linear-gradient(to top, var(--color-purple) 30%, transparent 40%);
}

.info-member {
  width: calc(var(--space-m) * 10.3); /* 164.8px */
  height: calc(var(--space-m) * 9); /* 144px */
}

/* 연락처 정보 */
.info-contact {
  width: calc(var(--space-m) * 24.6); /* 393px */
  height: calc(var(--space-m) * 7); /* 102px */
}
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  margin-left: calc(var(--space-m) * 2);
  width: calc(var(--space-m) * 20);
  gap: var(--space-m);
}

.value {
  margin-left: var(--space-m);
}
.label {
  border-right: 4px solid var(--color-purple);
}
.label,
.value {
  padding: 0.4rem;
}

.info-item .label {
  width: calc(var(--space-m) * 6);
  color: var(--color-black);
  font-weight: 400;
}

.info-item .value {
  flex: 1;
  color: var(--color-black);
}
/* 프로필 */
.profile-img {
  
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--space-m) * 7);
  height: calc(var(--space-m) * 7);
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
  margin-top: 2rem;
}

/* 회원정보, 연락처 정보 경계선 */
.section-divider {
  border-top: 1px solid #eee;
  margin: 6rem 0;
  padding-top: 0;
}

button {
  border: 1px solid var(--color-gray-light);
  border-radius: var(--space-s);
  background-color: var(--color-white);
  color: var(--color-black);
  cursor: pointer;
  transition: 0.3s;
  width: calc(var(--space-m) * 7.5);
}
/* 수정, 탈퇴 버튼 */
.btn-group {
  display: flex;
  justify-self: flex-end;
  gap: var(--space-s);
  margin-top: calc(var(--space-m) * 3.5);
}
.btn-group button {
  padding: var(--space-s) var(--space-m);
  font-size: 0.8rem;
}

.edit {
  margin-right: 1rem;
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

.modal-footer {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
}
</style>
