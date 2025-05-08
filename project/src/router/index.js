import { createRouter, createWebHistory } from 'vue-router'

// View 컴포넌트들 import
import ViewMainLoginOut from '../views/ViewMainLoginOut.vue'
import ViewMainLogin from '../views/ViewMainLogin.vue'
import ViewTransactionHistory from '../views/ViewTransactionHistory.vue'
import ViewMyPage from '../views/ViewMyPage.vue'
import ViewProfileEdit from '../views/ViewProfileEdit.vue'
import ViewSignUp from '../views/ViewSignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ViewMainLoginOut,
    },
    {
      path: '/main',
      component: ViewMainLogin,
    },
    {
      path: '/history',
      name: 'history',
      component: ViewTransactionHistory,
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: ViewMyPage,
    },
    {
      path: '/profileEdit',
      name: 'profileEdit',
      component: ViewProfileEdit,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: ViewSignUp,
    },
  ],
})

export default router
