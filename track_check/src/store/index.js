import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

let state = {
  isLogin: false,
  loginLoading: false
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
