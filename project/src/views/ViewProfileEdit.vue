<template>
  <div id="mypage">
    <div class="container my-5">
      <h5 class="mb-5">수정 페이지</h5>
      <div class="info-card">
        <div class="d-flex justify-content-between">
          <!-- 회원 정보 -->
          <div class="info-member">
            <div class="info-title">회원 정보</div>
            <div v-for="(item, index) in memberInfo" :key="'member-' + index">
              <div class="info-item">
                <label class="label">{{ item.label }}</label>
                <!-- id 고정 -->
                <div v-if="item.label === 'ID'" class="fixed-id">
                  {{ item.value }}
                </div>
                <!-- 생년월일 고정 -->
                <div v-else-if="item.label === '생년월일'" class="fixed-id">
                  {{ item.value }}
                </div>
                <input
                  v-else
                  type="text"
                  class="form-control"
                  v-model="item.value"
                  @input="validateItem(item)"
                />
              </div>
              <div class="text-danger small mt-1" v-if="errors[item.label]">
                {{ errors[item.label] }}
              </div>
            </div>
          </div>
          <!-- 프로필 사진 -->
          <div>
            <img :src="imagePreview" alt="프로필" class="profile-img" />
            <div>
              <button class="profile-edit btn btn-light btn-sm" @click="triggerFileUpload">
                사진 변경
              </button>
              <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                accept="image/*"
                hidden
              />
            </div>
          </div>
        </div>
        <!-- 구분선 -->
        <div class="section-divider"></div>

        <!-- 연락처 정보 -->
        <div class="info-contact">
          <div class="info-title">연락처 정보</div>
          <div v-for="(item, index) in contactInfo" :key="'contact-' + index">
            <div class="info-item">
              <label class="label">{{ item.label }}</label>
              <input
                type="text"
                class="form-control"
                v-model="item.value"
                @input="validateItem(item)"
              />
            </div>
            <div class="text-danger small mt-1" v-if="errors[item.label]">
              {{ errors[item.label] }}
            </div>
          </div>
          <!-- 버튼 -->
          <div id="btn-group">
            <ButtonSave />
          </div>
        </div>
        <ButtonDelete class="btn-delete" />
      </div>
    </div>
  </div>
  <!-- 탈퇴 모달 -->
  <ModalDelete />
</template>

<script setup>
import { ref, computed, provide, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
// import { useRouter } from 'vue-router'
import axios from 'axios'
import ButtonSave from '@/components/base/ButtonSave.vue'
import ButtonDelete from '@/components/base/ButtonDelete.vue'
import ModalDelete from '@/components/modal/ModalDelete.vue'

const userStore = useUserStore()
// const router = useRouter()

const memberInfo = computed(() => userStore.memberInfo)
const contactInfo = computed(() => userStore.contactInfo)
// const profileImage = computed(() => userStore.profileImage)

const errors = ref({})

const validateItem = (item) => {
  const label = item.label
  const value = item.value

  switch (label) {
    case '이름':
      errors.value[label] = /^[가-힣]{2,5}$/.test(value) ? '' : '이름은 한글 2~5자여야 합니다.'
      break
    case '생년월일':
      errors.value[label] = /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(value)
        ? ''
        : '2021-2-17 형식으로 입력해주세요.'
      break
    case '이메일':
      errors.value[label] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : '유효한 이메일 형식이 아닙니다.'
      break
    case '전화번호':
      errors.value[label] = /^01[016789]-\d{3,4}-\d{4}$/.test(value)
        ? ''
        : '010-1234-5678 형식으로 입력해주세요.'
      break
  }
}

const imagePreview = ref('')

const loadUserInfo = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/users/1`)
    if (res.data) {
      // 프로필 이미지 설정
      imagePreview.value = res.data.profileImage || ''
      // 사용자 정보 업데이트
      userStore.setMemberInfo(res.data.memberInfo)
      userStore.setContactInfo(res.data.contactInfo)
    }
  } catch (error) {
    console.error('사용자 정보 로딩 실패:', error)
  }
}

// 컴포넌트 마운트 시 사용자 정보 로딩
onMounted(() => {
  loadUserInfo()
})

provide('memberInfo', memberInfo)
provide('contactInfo', contactInfo)
provide('errors', errors)
provide('validateItem', validateItem)
provide('imagePreview', imagePreview)

const fileInput = ref(null)

const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = async () => {
      imagePreview.value = reader.result
      // const userId = localStorage.getItem('userId')
      try {
        await axios.patch(`http://localhost:3000/users/1`, {
          profileImage: reader.result,
        })
        alert('프로필 이미지가 저장되었습니다.')
      } catch (error) {
        console.error('이미지 저장 실패:', error)
        alert('이미지 저장에 실패했습니다.')
      }
    }
    reader.readAsDataURL(file)
  }
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
  margin-left: 5rem;
  padding: 1rem;
  padding-top: 2rem;
}

/* 전체 카드 */
.info-card {
  width: 50rem; /* 800px */
  height: 37.5rem; /* 600px */
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
  margin-bottom: 1.6rem;
  margin-left: 2rem;
  width: 20rem;
}

.info-item .value {
  flex: 1;
  color: #535353;
}

.fixed-id {
  margin-left: 1rem;
}

/* 회원 정보 */
.info-title {
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  width: 6rem;
  background: linear-gradient(to top, #d5d7f2 20%, transparent 40%);
}
.info-member {
  width: 10.3rem;
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
  /* margin: -1rem; */
  height: 2rem;
}

.info-item .label {
  width: 80px;
  color: #535353;
  font-weight: 400;
}

/* 연락처 정보 */
.info-contact {
  width: 24.6rem; /* 393px */
  height: 7rem; /* 102px */
  padding: 1rem;
}

/* 입력창 스타일 */
.form-control {
  /* display: inline; */
  /* margin-left: 5rem; */
  width: 13.9rem;
  margin-left: 1rem;
}

/* 에러 메시지 */
.text-danger {
  font-size: 0.85rem;
  color: #e53935 !important;
  margin-left: 5rem;
  text-align: center;
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

/* 버튼 */
#btn-group {
  margin-left: 41rem;
  margin-top: 4rem;
}
.btn-group {
  margin: 0.5rem;
}
.btn-delete {
  margin-top: 6.7rem;
  margin-left: 37em;
}
.profile-edit {
  margin-left: 1.1rem;
}
</style>
