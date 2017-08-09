import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Way from '@/components/Way'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/way',
      name: 'Way',
      component: Way
    }
  ]
})
