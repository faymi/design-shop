// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import moment from 'moment'
import colorPicker from './assets/js/vue-color-picker'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/reset.scss'
import 'font-awesome/css/font-awesome.css'

Vue.prototype.axios = axios
Vue.prototype.moment = moment

Vue.config.productionTip = false
Vue.use(colorPicker)
Vue.use(MintUI)

router.beforeEach((to, from, next) => {
  if (to.name === 'List') {
    if (to.query.domain) {
      store.dispatch('setDomain', to.query.domain)
    } else {
      alert('域名不正确，请联系管理员！')
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
