import { createRouter, createWebHistory } from 'vue-router'

// View 컴포넌트들 import
import ViewMainLogin from '../views/ViewMainLogin.vue'
import ViewMainLoginOut from '../views/ViewMainLoginOut.vue'
import ViewTransactionHistory from '../views/ViewTransactionHistory.vue'
import ViewMyPage from '../views/ViewMyPage.vue'
import ViewProfileEdit from '../views/ViewProfileEdit.vue'
import ViewSignUp from '../views/ViewSignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: ViewMainLogin,
    },
    {
      path: '/login',
      name: 'login',
      component: ViewMainLoginOut,
    },
    {
      path: '/recentdeals',
      name: 'recentdeals',
      component: ViewTransactionHistory,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: ViewMyPage,
    },
    {
      path: '/profileedit',
      name: 'profileedit',
      component: ViewProfileEdit,
    },
    {
      path: '/signup',
      name: 'signup',
      component: ViewSignUp,
    },
  ],
})

export default router
