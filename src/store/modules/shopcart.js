import * as types from '../types'

const state = {
  shopcartList: []
}

const actions = {
  addShopCart ({ commit }, data) {
    commit(types.ADD_SHOPCART, data)
  }
}

const getters = {
  shopcartList: state => state.shopcartList
}

const mutations = {
  [types.ADD_SHOPCART] (state, data) {
    state.shopcartList.push(data)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
