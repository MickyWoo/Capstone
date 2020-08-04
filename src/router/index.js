import Vue from 'vue'
import VueRouter from 'vue-router'
import frontpage from '@/view/frontpage.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'frontpage',
        component: frontpage
    },    
  ]

const router = new VueRouter({
  routes
})

export default router