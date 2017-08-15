import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// 全局默认值
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default {
  get (url, query = {}) {
    return axios.get(
      url,
      {
        params: query
      }
    )
  },
  post (url, params = {}) {
    let p = qs.stringify(params)
    return axios.post(
      url,
      p
    )
  },
  ajax (opts) {
    var data = opts.method.toLowerCase() === 'get' ? { params: opts.data } : qs.stringify(opts.data)
    return new Promise((resolve, reject) => {
      axios[opts.method](opts.url, data).then(res => {
        if (res.data.code === 200) {
          resolve(res.data.data)
        } else {
          reject(res.data.message)
        }
      }).catch(() => {
        Vue.$vux.toast.show({
          type: 'cancel',
          text: '接口有问题',
          width: '10em'
        })
      })
    })
  }
}
