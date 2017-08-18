import http from '../lib/http'
import Vue from 'vue'

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import router from '../router'

export const Login = ({commit, state}, object) => {
  let data = {
    admin: {
      email: object.username,
      password: object.password
    },
    verify_code: Number(object.code)
  }
  commit('STATE_LOGINLOADING', true)
  http.post('http://192.168.1.3/admin.php/Public/login', data).then(res => {
    console.log('res:' + JSON.stringify(res))
    console.log('status:' + res.status)
    // if (res.status) {
    //   commit('STATE_ISLOGIN', true)
    //   commit('STATE_LOGINLOADING', false)
    //   router.push({ path: '/check' })
    // }
    router.push({ path: '/check' })
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

export const ChangeLocation = ({commit}, String) => {
  commit('STATE_LOCATION', String)
}

export const ChangeDialogSwitch = ({commit}, Boolean) => {
  commit('STATE_DIALOGSWITCH', Boolean)
}

export const ChangeTitle = ({commit}, String) => {
  commit('STATE_TITLE', String)
}

export const ChangePathName = ({commit}, String) => {
  commit('STATE_PATHNAME', String)
}
