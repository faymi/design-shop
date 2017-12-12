// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/reset.scss'

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // let xtoken = getXtoken()
    // if (xtoken != null) {
    //   config.headers['X-Token'] = xtoken
    // }
    // if (config.method === 'post') {
    //   config.data = {
    //     ...config.data,
    //     _t: Date.parse(new Date()) / 1000
    //   }
    // } else if (config.method === 'get') {
    //   config.params = {
    //     _t: Date.parse(new Date()) / 1000,
    //     ...config.params
    //   }
    // }
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        params: {...config.params}
      }
    }
    return config
  }, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
// // token 已过期，重定向到登录页面
//   if (response.data.code === 4) {
//     localStorage.clear()
//     router.replace({
//       path: '/signin',
//       query: {redirect: router.currentRoute.fullPath}
//     })
//   }
//   return response
// }, function (error) {
// // Do something with response error
//   return Promise.reject(error)
// })

Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

let userId = sessionStorage.getItem('username')
if (userId === '') {
  router.push('/login')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
