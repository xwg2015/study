import http from '../lib/http'
import Vue from 'vue'

import { ToastPlugin, LoadingPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

import router from '../router'

const Error = (msg) => {
  let info = msg || '接口报错'
  Vue.$vux.toast.show({
    type: 'cancel',
    text: info,
    width: '10em'
  })
}

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
    if (res.data.status) {
      commit('STATE_ISLOGIN', true)
      commit('STATE_LOGINLOADING', false)
      router.push({ path: '/check' })
    } else {
      Error(res.data.info)
      commit('STATE_LOGINLOADING', false)
    }
  }).catch(() => {
    Error()
    commit('STATE_LOGINLOADING', false)
    router.push({ path: '/check' })
  })
}

export const GetTrackList = ({commit}) => {
  http.post('http://192.168.1.3/admin.php/Warning/getList').then(res => {
    if (res.data.status) {
      commit('STATE_TRACKLIST', res.data.info)
      commit('STATE_TRACKCHOOSE', [res.data.info[0].value], res.data.info[1].value)
      let data = {
        table: res.data.info[1].value,
        order: 0
      }
      console.log(data)
      GetCheckList({commit}, data)
    } else {
      Error(res.data.info)
    }
  }).catch(() => {
    Error()
  })
}

export const GetCheckList = ({commit}, object) => {
  let data = {
    table: object.table,
    order: object.order
  }
  Vue.$vux.loading.show({
    text: 'Loading'
  })
  // commit('STATE_CHECKINFO', {})
  http.post('http://192.168.1.3/admin.php/Warning/showRecord', data).then(res => {
    if (res.data.status) {
      Vue.$vux.loading.hide()
      commit('STATE_CHECKINFO', res.data.info[0])
      commit('STATE_DIALOGSWITCH', false)
      commit('STATE_TITLE', res.data.info[0].period)
    } else {
      Error(res.data.info)
    }
  }).catch(() => {
    Error()
  })
}

export const Check = ({commit, state}, object) => {
  let data = {
    id: object.id,
    table: object.table
  }

  http.post('http://192.168.1.3/admin.php/Warning/signIn', data).then(res => {
    if (res.data.status) {
      Vue.$vux.toast.show({
        type: 'success',
        text: '打卡成功！',
        width: '10em'
      })
      let refreshData = {
        table: state.trackChoose[1],
        order: 0
      }
      GetCheckList({commit}, refreshData)
    } else {
      Error(res.data.info)
    }
  }).catch(() => {
    Error()
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

export const ChangeTrackChoose = ({commit}, Array) => {
  commit('STATE_TRACKCHOOSE', Array)
}
