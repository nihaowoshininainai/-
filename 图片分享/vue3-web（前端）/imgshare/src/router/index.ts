import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserView from '@/views/UserView.vue'
import ImgView from '@/views/ImgView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView
        },
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView
        },
        {
          path: 'uid/:uid',
          name: 'user',
          component: UserView
        },
        {
          path: 'img/:iid',
          name: 'img',
          component:ImgView
        }
      ]
    }
  ]
})

export default router
