import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { title: 'ImgShare - 发现图片' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { title: '登录 - ImgShare' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: { title: '注册 - ImgShare' }
    },
    {
      path: '/detail/:iid',
      name: 'detail',
      component: () => import('@/views/Detail.vue'),
      meta: { title: '图片详情 - ImgShare' }
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('@/views/Upload.vue'),
      meta: { title: '上传图片 - ImgShare', requiresAuth: true }
    },
    {
      path: '/my/images',
      name: 'myImages',
      component: () => import('@/views/MyImages.vue'),
      meta: { title: '我的上传 - ImgShare', requiresAuth: true }
    },
    {
      path: '/my/likes',
      name: 'myLikes',
      component: () => import('@/views/MyLikes.vue'),
      meta: { title: '我的点赞 - ImgShare', requiresAuth: true }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'ImgShare'
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router