// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/chamados'
    },
    {
      path: '/chamados',
      name: 'chamados',
      component: () => import('@/views/TicketsView.vue')
    },
    {
      path: '/chamados/novo',
      name: 'novo-chamado',
      component: () => import('@/views/NovoTicketView.vue')
    },
    {
      path: '/chamados/:id',
      name: 'detalhe-chamado',
      component: () => import('@/views/TicketDetailView.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminPanel.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'nao-encontrado',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router