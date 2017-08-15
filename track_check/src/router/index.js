import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Check from '@/components/Check'
import Summary from '@/components/Summary'
import Index from '@/components/Index'

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/check',
      name: 'check',
      component: Check
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary
    }
  ]
})
