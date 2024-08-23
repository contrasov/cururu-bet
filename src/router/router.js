import { createRouter, createWebHistory } from 'vue-router'
import Eventos from '../components/Eventos.vue'
import Info from '../Infos.vue'
import { ref } from 'vue'

const showCalendario = ref(true); // Controla a exibição do calendário

const routes = [
  { 
    path: '/', 
    name: 'Eventos', 
    component: Eventos,
    beforeEnter: (to, from, next) => {
      showCalendario.value = true; // Exibe o calendário na rota '/'
      next();
    }
  },
  { 
    path: '/info/:id', 
    name: 'Info', 
    component: Info,
    beforeEnter: (to, from, next) => {
      showCalendario.value = false; // Oculta o calendário na rota '/info/:id'
      next();
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { showCalendario }; // Exporta showCalendario para ser usado no App.vue
export default router
