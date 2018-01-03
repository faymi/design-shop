// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import colorPicker from './assets/js/vue-color-picker'
import './assets/css/reset.scss'
import 'font-awesome/css/font-awesome.css'

Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(colorPicker)

router.push('/list')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
