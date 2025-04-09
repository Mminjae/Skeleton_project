import { createRouter, createWebHistory } from 'vue-router'

// View 컴포넌트들 import
import TheMainView from '../views/TheMainView.vue'
import TheLoginView from '../views/TheLoginView.vue'
import RecentDealView from '../views/RecentDealView.vue'
import MyPageView from '../views/MyPageView.vue'
import ProfileEdit from '../views/ProfileEdit.vue'
import MembershipGuide from '../views/MembershipGuide.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: TheMainView,
    },
    {
      path: '/login',
      name: 'login',
      component: TheLoginView,
    },
    {
      path: '/recentDeals',
      name: 'recentDeals',
      component: RecentDealView,
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: MyPageView,
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: ProfileEdit,
    },
    {
      path: '/memberShipguide',
      name: 'memberShipguide',
      component: MembershipGuide,
    },
  ],
})

export default router
