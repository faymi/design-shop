import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import com from './modules/com'
import list from './modules/list'
import user from './modules/user'
import shopCart from './modules/shopcart'

Vue.use(Vuex)

/**
 * vuex-persist插件
 * 相关文档：http://www.bslxx.com/a/vue/2017/1124/1454.html
 * 防止刷新后store状态清除
 */
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    com,
    list,
    user,
    shopCart
  }
})
