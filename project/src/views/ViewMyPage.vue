<template>
  <div id="mypage">
    <div class="container my-5">
      <h2 class="mb-5">마이 페이지</h2>
      <div class="info-card">
        <div class="d-flex justify-content-between">
          <!-- 회원 정보 -->
          <div class="info-member">
            <div class="info-title">회원 정보</div>
            <div class="info-item" v-for="(item, index) in memberInfo" :key="index">
              <div class="label">{{ item.label }}</div>
              <div class="value">{{ item.value }}</div>
            </div>
          </div>

          <!-- 프로필 사진-->
          <div>
            <img :src="profileImage || defaultProfile" alt="프로필" class="profile-img" />
          </div>
        </div>
        <!-- 구분선 -->
        <div class="section-divider"></div>

        <!-- 연락처 정보 -->
        <div class="info-contact">
          <div class="info-title">연락처 정보</div>
          <div class="info-item" v-for="(item, index) in contactInfo" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
        <!-- 버튼  -->
        <!-- <ButtonDelete /> -->
        <ButtonEdit class="btn-edit" />
      </div>
    </div>
  </div>
  <!-- 탈퇴 모달 -->
  <!-- <ModalDelete /> -->
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'
// import ModalDelete from '@/components/modal/ModalDelete.vue'
// import ButtonDelete from '@/components/base/ButtonDelete.vue'
import ButtonEdit from '@/components/base/ButtonEdit.vue'
import defaultProfile from '@/assets/imgs/user-gray.svg'

// 로그인 된 정보 가져오기
const route = useRoute()
const userStore = useUserStore()
onMounted(() => {
  const userId = localStorage.getItem('loggedInUser') // 또는 localStorage.getItem('userId')
  userStore.fetchUser(userId)
})

const memberInfo = computed(() => userStore.memberInfo)
const contactInfo = computed(() => userStore.contactInfo)
const profileImage = computed(() => userStore.profileImage)
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#mypage {
  font-family: 'Noto Sans KR', sans-serif;
  margin-left: 1.1rem;
}

h2 {
  padding: var(--space-l) 0 var(--space-s) calc(var(--space-m) * 2.5);
  color: var(--color-black);
  font-size: var(--font-xl);
}

/* 전체 카드 */
.info-card {
  width: calc(var(--space-m) * 50);
  margin: var(--space-m) 0 0 calc(var(--space-m) * 5);
  padding: var(--space-xl);
  background: var(--color-white);
  border-radius: var(--space-m);
  box-shadow: 0 0 var(--space-m) rgba(0, 0, 0, 0.05);
  position: relative;
}

/* 정보 공통 */
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  margin-left: 2rem;
  width: 20rem;
}

.info-item .value {
  flex: 1;
  color: #535353;
}

/* 회원 정보 */
.info-title {
  margin-bottom: 2rem;
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
.d-flex {
  padding: 1rem;
}

/* 구분선 */
.section-divider {
  border-top: 1px solid #eee;
  margin: 3rem;
  margin-top: 5.2rem;
}
.label {
  border-right: 4px solid var(--color-purple);
}

.info-item .label {
  width: calc(var(--space-m) * 6);
  color: var(--color-black);
  font-weight: 400;
}

/* 연락처 정보 */
.info-contact {
  width: 24.6rem;
  height: 7rem;
  padding: 1rem;
}

/* 프로필 */
.profile-img {
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2rem;
  margin-top: 2rem;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.label,
.value {
  padding: 0.5rem;
}

/* 버튼 */
.btn-edit {
  margin-left: 42.5rem;
  margin-top: 6.3rem;
  position: relative;
  white-space: nowrap;
}
</style>
