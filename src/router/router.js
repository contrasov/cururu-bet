// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Eventos from '../components/Eventos.vue'
import Info from '../Infos.vue'
import Header from '../components/Header.vue'

const routes = [
  { path: '/', name: 'Eventos', component: Eventos },
  { path: '/info/:id', name: 'Info', component: Info } // Rota com o parâmetro id
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
