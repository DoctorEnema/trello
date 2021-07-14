import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home'
import board from '../pages/board'
import cardDetails from '../pages/card-details'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board/:id',
    name: 'board',
    component: board
  },
  {
    path: '/card/:id',
    name: 'card',
    component: cardDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
