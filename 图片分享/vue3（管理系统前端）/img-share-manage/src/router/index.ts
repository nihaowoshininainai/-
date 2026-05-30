import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            meta: { title: '数据仪表盘' }
        },
        {
            path: '/user',
            name: 'UserManage',
            component: () => import('@/views/user/index.vue'),
            meta: { title: '用户管理' }
        },
        {
            path: '/image',
            name: 'ImageManage',
            component: () => import('@/views/image/index.vue'),
            meta: { title: '图片管理' }
        },
        {
            path: '/comment',
            name: 'CommentManage',
            component: () => import('@/views/comment/index.vue'),
            meta: { title: '评论管理' }
        }
    ]
})

router.beforeEach((to, _from, next) => {
    document.title = `${to.meta.title || ''} - 图片分享管理系统`
    next()
})

export default router
