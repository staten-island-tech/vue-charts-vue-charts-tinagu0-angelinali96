import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Average Scores',
      component: () => import('../views/AverageScores.vue')
    },
    {
      path: '/testtakers',
      name: 'Test Takers',
      component: () => import('../views/TestTakers.vue')
    },
    {
      path: '/takerdist',
      name: 'Test Taker Distribution',
      component: () => import('../views/TakerDistribution.vue')
    },
    {
      path: '/totalscore',
      name: 'Total Score',
      component: () => import('../views/TotalScore.vue')
    }
  ]
})

export default router
