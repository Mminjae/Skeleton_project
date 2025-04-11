<template>
  <div id="mypage" class="container my-5">
    <h5 class="mb-4">마이페이지</h5>
    <div class="info-card p-4 rounded shadow-sm bg-white">
      <div class="d-flex justify-content-between flex-wrap gap-4">
        <!-- 왼쪽: 회원 + 연락처 정보 -->
        <div class="flex-grow-1" style="min-width: 280px">
          <!-- 회원 정보 -->
          <h6 class="mb-3 border-bottom pb-1">회원정보</h6>
          <div v-for="(item, index) in memberInfo" :key="'member-' + index" class="mb-3">
            <div class="form-row">
              <label class="form-label">{{ item.label }}</label>
              <input
                type="text"
                class="form-control"
                v-model="item.value"
                @input="validateItem(item)"
              />
            </div>
            <div v-if="item.label === 'ID' && item.value && !errors['ID']" class="text-info">
              사용 가능한 ID입니다.
            </div>
            <div class="text-danger small mt-1" v-if="errors[item.label]">
              {{ errors[item.label] }}
            </div>
          </div>

          <div class="section-divider"></div>

          <!-- 연락처 정보 -->
          <h6 class="mt-4 mb-3 border-bottom pb-1">연락처정보</h6>
          <div v-for="(item, index) in contactInfo" :key="'contact-' + index" class="mb-3">
            <label class="form-label">{{ item.label }}</label>
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
          <div class="button-group">
            <button class="btn btn-light" @click="handleSubmit">저장</button>
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#unregisterModal">
              회원탈퇴
            </button>
          </div>
        </div>

        <!-- 오른쪽: 프로필 사진 -->
        <div class="text-center" style="min-width: 120px">
          <img
            src="#"
            alt="프로필"
            class="profile-img mb-2"
            style="width: 100px; height: 100px; background-color: #eee; object-fit: cover"
          />
          <div>
            <button class="btn btn-outline-secondary btn-sm">사진 변경</button>
          </div>
        </div>
      </div>

      <!-- 탈퇴 모달 -->
      <div class="modal fade" id="unregisterModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p class="fw-bold text-dark">정말 탈퇴하시겠습니까?</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-light" data-bs-dismiss="modal">취소</button>
              <button class="btn btn-danger" data-bs-dismiss="modal" @click="confirmDelete">
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
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const userStore = useUserStore()
const memberInfo = computed(() => userStore.memberInfo)
const contactInfo = computed(() => userStore.contactInfo)
const errors = ref({})
const validateItem = (item) => {
  const label = item.label
  const value = item.value

  // 유효성 검사
  switch (label) {
    case '이름':
      errors.value[label] = /^[가-힣]{2,5}$/.test(value) ? '' : '이름은 한글 2~5자여야 합니다.'
      break
    case '생년월일':
      errors.value[label] = /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(value)
        ? ''
        : '예: 2021-2-17 형식으로 입력해주세요.'
      break
    case 'ID':
      errors.value[label] = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{4,16}$/.test(value)
        ? ''
        : 'ID는 영문+숫자 조합 4~16자여야 합니다.'
      break
    case '이메일':
      errors.value[label] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ''
        : '올바른 이메일 형식이 아닙니다.'
      break
    case '전화번호':
      errors.value[label] = /^01[016789]-\d{3,4}-\d{4}$/.test(value)
        ? ''
        : '예: 010-1234-5678 형식으로 입력해주세요.'
      break
  }
}

const handleSubmit = async () => {
  ;[...memberInfo.value, ...contactInfo.value].forEach(validateItem)
  const isValid = Object.values(errors.value).every((msg) => !msg)
  if (!isValid) {
    alert('입력값을 확인해주세요.')
    return
  }
  // 1. payload 생성
  const payload = {
    name: memberInfo.value.find((i) => i.label === '이름')?.value,
    brith: memberInfo.value.find((i) => i.label === '생년월일')?.value,
    userId: Number(memberInfo.value.find((i) => i.label === 'ID')?.value),
    email: contactInfo.value.find((i) => i.label === '이메일')?.value,
    phone: contactInfo.value.find((i) => i.label === '전화번호')?.value,
    password: '12341234',
    id: '1',
  }
  // 2. 서버에 저장
  try {
    await axios.put('http://localhost:3000/users/1', payload)
    alert('저장되었습니다.')
    router.push('/mypage')
  } catch (e) {
    console.error('저장 실패:', e)
    alert('저장에 실패했습니다.')
  }
}
const confirmDelete = () => {
  router.push('/')
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
  /* padding: 1rem; */
  /* padding-top: 2rem; */
}

/* 전체 카드 스타일 */
.info-card {
  width: 50rem; /* 800px */
  height: 37.5rem; /* 600px */
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  padding: 2rem 5rem 0rem 2rem;
  margin: 1rem;
  background-color: white;
}

/* 제목 텍스트 */
h5,
h6 {
  font-weight: 400;
  color: #535353;
}

/* 구분선 스타일 */
.border-bottom {
  font-weight: 500;
  color: #535353;
  padding-left: 0.8rem;
  width: 5.7rem;

  background: linear-gradient(to top, #d5d7f2 30%, transparent 40%);
}

/* 라벨 스타일 */
.form-label {
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

.form-control:focus {
  outline-color: red;
}

/* 에러 메시지 */
.text-danger {
  font-size: 0.85rem;
  color: #e53935 !important;
  margin-left: 5rem;
  text-align: center;
}

/* 프로필 이미지 스타일 */
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
.section-divider {
  border-top: 1px solid #eee;
}

/* 버튼 스타일 */
.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.btn-light {
  width: 5rem;
  background: white;
  border: 1px solid #ddd;
  color: #333;
}

.btn-danger {
  width: 6rem;
  background-color: #e53935;
  color: white;
  border: none;
}

.btn-outline-secondary {
  border: 1px solid #bbb;
  color: #555;
}

.modal-content {
  border-radius: 12px;
}

.modal-body p {
  font-size: 1.05rem;
}
</style>
