import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/projets', name: 'projets', component: Projects }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(){
    return { top: 0 }
  }
})

export default router
