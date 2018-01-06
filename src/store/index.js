import Vue from 'vue'
import Vuex from 'vuex'

import com from './modules/com'
import list from './modules/list'
import user from './modules/user'
import shopCart from './modules/shopcart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    com,
    list,
    user,
    shopCart
  }
})
