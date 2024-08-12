import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../view/HomeView.vue";
import CommentView from "../view/CommentView.vue";
import UserView from "../view/UserView.vue";
import ImgView from "../view/ImgView.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: 'user',
                    name: 'user',
                    component: UserView
                },
                {
                    path: 'comment',
                    name: 'comment',
                    component:CommentView
                },
                {
                    path: 'img',
                    name: 'img',
                    component:ImgView
                }
            ]
        }
    ]
})

export default router