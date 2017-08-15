import http from '../lib/http'
import Vue from 'vue'

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import router from '../router'

export const Login = ({commit, state}, object) => {
  let data = {
    name: '1'
  }
  commit('STATE_LOGINLOADING', true)
  http.post('/user', data).then(res => {
    if (res.data.code === 200) {
      commit('STATE_ISLOGIN', true)
      commit('STATE_LOGINLOADING', false)
    }
  }).catch(() => {
    Vue.$vux.toast.show({
      type: 'cancel',
      text: '接口有问题',
      width: '10em'
    })
    commit('STATE_ISLOGIN', true)
    commit('STATE_LOGINLOADING', false)
    router.push({ path: '/check' })
  })
}
