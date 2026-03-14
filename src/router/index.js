import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Workouts from '../views/Workouts.vue'
import WorkoutDetail from '../views/WorkoutDetail.vue'
import Nutrition from '../views/Nutrition.vue'
import Progress from '../views/Progress.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: Workouts
  },
  {
    path: '/workouts/:day',
    name: 'WorkoutDetail',
    component: WorkoutDetail
  },
  {
    path: '/nutrition',
    name: 'Nutrition',
    component: Nutrition
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
