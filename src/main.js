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
import Vant from 'vant'

import 'mint-ui/lib/style.css'
import './assets/css/reset.scss'
import 'font-awesome/css/font-awesome.css'
import 'vant/lib/vant-css/index.css'

Vue.prototype.axios = axios
Vue.prototype.moment = moment

Vue.config.productionTip = false
Vue.use(colorPicker)
Vue.use(MintUI)
Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
