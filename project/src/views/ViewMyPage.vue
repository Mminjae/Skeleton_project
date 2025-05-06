<template>
  <div id="mypage">
    <div class="container my-5">
      <h5 class="mb-5">마이 페이지</h5>
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
          <!-- 버튼  -->
          <div id="btn-group">
            <ButtonEdit />
            <!-- <ButtonDelete /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 탈퇴 모달 -->
  <ModalDelete />
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRoute } from 'vue-router'
import ModalDelete from '@/components/modal/ModalDelete.vue'
// import ButtonDelete from '@/components/base/ButtonDelete.vue'
import ButtonEdit from '@/components/base/ButtonEdit.vue'

// 로그인 된 정보 가져오기
const route = useRoute()
const userStore = useUserStore()
onMounted(() => {
  const userId = route.params.id // 또는 localStorage.getItem('userId')
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
  margin-left: 5rem;
  padding: 1rem;
  padding-top: 2rem;
}

/* 전체 카드 */
.info-card {
  width: 50rem; /*800px */
  height: 37.5rem; /*600px*/
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  padding: 2rem 5rem 0rem 2rem;
  margin: 1rem;
  background-color: white;
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
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  width: 6rem;
  background: linear-gradient(to top, #d5d7f2 30%, transparent 40%);
}
.info-member {
  /* width: 10.3rem; */
  height: 9.7rem;
}
.d-flex {
  padding: 1rem;
}

/* 구분선 */
.section-divider {
  border-top: 1px solid #eee;
  margin: 3rem 0;
}

.label {
  border-right: 4px solid #d5d7f2;
}

.info-item .label {
  width: 80px;
  color: #535353;
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

/* 버튼 */
#btn-group {
  margin-left: 41rem;
  margin-top: 4rem;
}
.btn-group {
  margin: 0.5rem;
}
</style>
