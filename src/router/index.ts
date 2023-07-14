import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/Login/LoginPage.vue';
import ConfigLoginPage from '../views/Login/Config.vue';
import WelcomePage from '../views/WelcomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    children:[
      {
        path: '',
        name: 'Welcome',
        component: WelcomePage
      },
    ]
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});



export default router
