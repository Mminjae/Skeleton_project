<template>
  <div id="mypage">
    <div class="container my-5">
      <h5 class="mb-5">수정페이지</h5>
      <div class="info-card">
        <div class="d-flex justify-content-between">
          <!-- 회원 정보 -->
          <div class="info-member">
            <div class="info-title">회원 정보</div>
            <div v-for="(item, index) in memberInfo" :key="'member-' + index" class="mb-3">
              <div class="form-row">
                <label class="form-label">{{ item.label }}</label>
                <!-- id 고정 -->
                <div v-if="item.label === 'ID'" class="id-style">
                  {{ item.value }}
                </div>
                <!-- 생년월일 고정 -->
                <div v-else-if="item.label === '생년월일'" class="id-style">
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
              <button class="profile-edit btn btn-light" @click="triggerFileUpload">
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
          <div v-for="(item, index) in contactInfo" :key="'contact-' + index" class="mb-3">
            <label class="label">{{ item.label }}</label>
            <input
              type="text"
              class="form-control"
              v-model="item.value"
              @input="validateItem(item)"
            />
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
import { ref, computed, provide } from 'vue'
import { useUserStore } from '@/stores/userStore'
// import { useRouter } from 'vue-router'
// import axios from 'axios'
import ButtonSave from '@/components/base/ButtonSave.vue'
import ButtonDelete from '@/components/base/ButtonDelete.vue'
import ModalDelete from '@/components/modal/ModalDelete.vue'

const userStore = useUserStore()
// const router = useRouter()

const memberInfo = computed(() => userStore.memberInfo)
const contactInfo = computed(() => userStore.contactInfo)

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

provide('memberInfo', memberInfo)
provide('contactInfo', contactInfo)
provide('errors', errors)
provide('validateItem', validateItem)

// 프로필 사진 변경
const fileInput = ref(null)
const imagePreview = ref('#') // 기본 이미지 or 빈 값

// 버튼 클릭 시 input 클릭
const triggerFileUpload = () => {
  fileInput.value.click()
}

// 파일 선택 후 미리보기
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.value = reader.result // base64 데이터로 미리보기
    }
    reader.readAsDataURL(file)

    // 필요 시, 여기서 서버 업로드 로직 작성 가능
    // const formData = new FormData()
    // formData.append('profileImage', file)
    // await axios.post('서버URL', formData)
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

/* 회원 정보 */
.info-title {
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  width: 6rem;
  background: linear-gradient(to top, #d5d7f2 20%, transparent 40%);
}

.d-flex {
  padding: 1rem;
}

/* 구분선 */
.section-divider {
  border-top: 1px solid #eee;
  margin: 3rem 0;
}

/* 연락처 정보 */
.info-contact {
  width: 24.6rem; /* 393px */
  height: 7rem; /* 102px */
  padding: 1rem;
}
/* 라벨 스타일 */
.label {
  font-weight: 400;
  color: #535353;
  width: 4rem;
}

/* 입력창 스타일 */
.form-control {
  display: inline;
  align-items: center;
  margin-bottom: 0.8rem;
  margin-left: 5rem;
  width: 15rem;
}

.id-style {
  display: inline;
  align-items: center;
  margin-bottom: 0.8rem;
  margin-left: 5rem;
  width: 15rem;
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
  margin-top: 12rem;
}
.btn-group {
  margin: 0.5rem;
}
.btn-delete {
  margin-top: 8.5rem;
  margin-left: -1.5rem;
}
</style>
