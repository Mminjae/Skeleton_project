<template>
  <div id="editpage">
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
              <div class="text-danger text-right" v-if="errors[item.label]">
                {{ errors[item.label] }}
              </div>
            </div>
          </div>
          <!-- 프로필 사진 -->
          <div>
            <img :src="imagePreview || defaultProfile" alt="프로필" class="profile-img" />
            <div>
              <li>
                <button class="profile-edit btn btn-light btn-sm" @click="triggerFileUpload">
                  사진 변경
                </button>
              </li>
              <li><ButtonProfileReset class="profile-reset" /></li>
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
            <div class="text-danger" v-if="errors[item.label]">
              {{ errors[item.label] }}
            </div>
          </div>
        </div>
        <!-- 버튼 -->
        <ButtonSave class="btn-save" />
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
import ButtonProfileReset from '@/components/base/ButtonProfileReset.vue'
import defaultProfile from '@/assets/imgs/user-gray.svg'

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
    // case '생년월일':
    //   errors.value[label] = /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(value)
    //     ? ''
    //     : '2021-2-17 형식으로 입력해주세요.'
    //   break
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
  list-style: none;
}
#editpage {
  font-family: 'Noto Sans KR', sans-serif;
  margin-left: 1.1rem;
  /* padding: 1rem; */
  /* padding-top: 2rem; */
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

/* 공통 */
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  margin-left: 2rem;
  width: 20rem;
}

.fixed-id {
  margin-left: 0.5rem;
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
  width: calc(var(--space-m) * 10.3);
  height: calc(var(--space-m) * 9);
}

.d-flex {
  padding: 1rem;
}

/* 구분선 */
.section-divider {
  border-top: 1px solid #eee;
  margin: 3rem;
}
/* .label {
  border-right: 4px solid var(--color-purple);
} */

/* .info-item .label {
  width: calc(var(--space-m) * 6);
  color: var(--color-black);
  font-weight: 400;
} */

.label,
.value {
  padding: 0.5rem;
}

/* 연락처 정보 */
.info-contact {
  width: 24.6rem;
  height: 7rem;
  padding: 1rem;
}

/* 입력창 스타일 */
.form-control {
  width: 13rem;
  margin-left: 0.5rem;
  position: relative;
  /* z-index: 1; */
}

/* 에러 메시지 */
.text-danger {
  font-size: 0.85rem;
  text-align: right;
  margin-top: -1.3rem;
  min-height: 1.2rem;
  white-space: nowrap;
}

.text-right {
  margin-left: 11.5rem;
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

/* 버튼 */
.btn-save {
  margin-left: 42.5rem;
  margin-top: 6.3rem;
  position: relative;
  /* margin-top: 2.7rem; */
}

.btn-delete {
  margin-top: -3.7rem;
  margin-left: 37em;
}
.profile-edit {
  margin-left: 1.1rem;
}
.profile-reset {
  /* margin-top: 0.5rem; */
  margin-left: 1.6rem;
}
</style>
