import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

let state = {
  // 登录状态
  isLogin: false,
  // 登录加载状态
  loginLoading: false,
  // 当前位置
  location: '',
  // 切换弹框
  dialog: {
    switch: false
  },
  // 标题
  title: '',
  // 路由
  pathName: 'index',
  // 当前下标
  curIndex: 0,
  // 检查项目二级联动列表
  trackList: [],
  // 已选的检查项目
  trackChoose: [],
  // 检查项目详情
  checkInfo: {},
  // 验证码图片
  verifyCode: '/admin.php/Public/verifyCode'
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
