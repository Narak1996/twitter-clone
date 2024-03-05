import {createRouter, createWebHistory} from "vue-router";
import LoginPage from "@/views/LoginPage";
import HomePage from "@/views/HomePage";
import TwitPage from "@/views/TwitPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";


const app_name = ' / X'
const routes = [
    {'path': '/login', 'component': LoginPage, 'name': `Login ${app_name}`},
    {
        path: '/', 'component': HomePage, 'name': `Home  ${app_name}`,
        children: [
            {'path': '/', 'component': TwitPage, 'name': `Home ${app_name}`},
            {'path': '/profile', 'component': ProfilePage, 'name': `Profile ${app_name}`},
        ],
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});
export default router;