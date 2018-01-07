import * as types from '../types'

const state = {
  shopcartList: [], // 购物车数据列表
  singleOrderData: {} // 单个订单数据
}

const actions = {
  addShopCart ({ commit }, data) {
    commit(types.ADD_SHOPCART, data)
  },
  addSingleOrder ({ commit }, data) {
    commit(types.ADD_SINGLE_ORDER, data)
  }
}

const getters = {
  shopcartList: state => state.shopcartList,
  singleOrderData: state => state.singleOrderData
}

const mutations = {
  [types.ADD_SHOPCART] (state, data) {
    state.shopcartList.push(data)
  },
  [types.ADD_SINGLE_ORDER] (state, data) {
    state.singleOrderData = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
