import { createRouter, createWebHistory } from 'vue-router' //npm install vue-router@4
import LoginView from '../Pages/login.vue' 
import RegisterView from '../Pages/Register.vue'
import Card from "../Pages/CardApp.vue"
import HomeView from '../Pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/card',
      name: 'card',
      component: Card
    }
  ]
})

export default router