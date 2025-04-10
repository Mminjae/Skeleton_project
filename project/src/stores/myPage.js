import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { router } from 'json-server'

const user = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/1')
    user.value = response.data

    // 데이터 분배
    memberInfo.value = [
      { label: '이름', value: user.value.name },
      { label: '생년월일', value: user.value.brith },
      { label: 'ID', value: String(user.value.userId) },
    ]

    contactInfo.value = [
      { label: '이메일', value: user.value.email },
      { label: '전화번호', value: formatPhone(user.value.phone) },
    ]
  } catch (error) {
    console.error('데이터 로드 실패:', error)
  }
})
const memberInfo = ref([])
const contactInfo = ref([])

const formatPhone = (number) => {
  if (!number) return ''
  return number.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
}

const router = useRouter()

// const goEdit = () => {
//   router.push('/profileEdit')
// }

// const confirmDelete = () => {
//   router.push('/')
// }
