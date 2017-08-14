import Vue from 'vue'
import Router from 'vue-router'
import Check from '@/components/Check'
import Summary from '@/components/Summary'

import { DatetimePlugin } from 'vux'
Vue.use(DatetimePlugin)

Vue.use(Router)

export default new Router({
  routes: [
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
