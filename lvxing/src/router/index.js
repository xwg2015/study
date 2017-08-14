import Vue from 'vue'

import Index from '@/components/Index'
import Way from '@/components/Way'
import Airplane from '@/components/Airplane'
import Train from '@/components/Train'
import Ship from '@/components/Ship'
import Bus from '@/components/Bus'
import Foot from '@/components/Foot'

import Router from 'vue-router'
Vue.use(Router)

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

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
    },
    {
      path: '/airplane',
      name: 'Airplane',
      component: Airplane
    },
    {
      path: '/train',
      name: 'Train',
      component: Train
    },
    {
      path: '/ship',
      name: 'Ship',
      component: Ship
    },
    {
      path: '/bus',
      name: 'Bus',
      component: Bus
    },
    {
      path: '/foot',
      name: 'Foot',
      component: Foot
    }
  ]
})
