import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'
// import BoosterPack from '@/views/BoosterPack.vue'
// import cardSearch from '@/views/cardSearch.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },    
  ]

const router = new VueRouter({
  routes
})

export default router