import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/testtakers',
      name: 'Test Takers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestTakers.vue')
    },
    {
      path: '/avgscores',
      name: 'Average Scores',
      component: () => import('../views/AverageScores.vue')
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
