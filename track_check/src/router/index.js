import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Check from '@/components/Check'
import Summary from '@/components/Summary'
import Index from '@/components/Index'
import NoFound from '@/components/404'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        index: 0
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        index: 0
      }
    },
    {
      path: '/check',
      name: 'check',
      component: Check,
      meta: {
        index: 0
      }
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
      meta: {
        index: 1
      }
    },
    {
      path: '*',
      name: 'noFound',
      component: NoFound
      // redirect: { name: 'index' }
    }
  ]
})
