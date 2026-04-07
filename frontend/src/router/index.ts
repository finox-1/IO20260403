import { createRouter, createWebHistory } from 'vue-router' //npm install vue-router@4
import LoginView from '../components/login.vue' 
import RegisterView from '../components/Register.vue'
import Card from "../CardApp.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
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