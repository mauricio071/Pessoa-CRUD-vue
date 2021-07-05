import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Novo from '../views/Novo.vue'
import Editar from '../views/Editar.vue'
import Residencia from '../views/Residencia.vue'
import Cnh from '../views/Cnh.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/novo',
    name: 'novo',
    component: Novo
  },

  {
    path: '/editar/:id',
    name: 'editar',
    component: Editar
  },

  {
    path: '/residencia/:id',
    name: 'residencia',
    component: Residencia
  },

  {
    path: '/cnh/:id',
    name: 'cnh',
    component: Cnh
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
