import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

let state = {
  // 登录状态
  isLogin: true,
  // 登录加载状态
  loginLoading: false,
  // 当前位置
  location: '',
  // 切换弹框
  dialogSwitch: false,
  // 当前下标
  curIndex: 0
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
