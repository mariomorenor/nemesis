import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/Login/LoginPage.vue';
import ConfigLoginPage from '../views/Login/Config.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/config',
    name: 'Config',
    component: ConfigLoginPage
  },
  {
    path:'/attendance',
    name:'Attendance',
    component: ()=>import('@/views/Attendance/AttendancePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});



export default router
