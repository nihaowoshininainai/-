import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserView from '@/views/UserView.vue'
import ImgView from '@/views/ImgView.vue'
import Search from '@/views/Search.vue'
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
          redirect: '/home/uploaddate/1'
        },
        {
          path: 'home/:order/:page',
          name: 'home',
          component: HomeView,
          props: true
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
          component: ImgView
        },
        {
          path: 'search/:iname/:order/:page',
          name: 'search',
          component: Search,
          props:true
        }
      ]
    }
  ]
})

export default router
