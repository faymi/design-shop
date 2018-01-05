import * as types from '../types'
import api from '@/api/fetch'

const state = {
  goodsList: [],
  logo: '',
  shopName: '',
  goodsId: ''
}

const actions = {
  getGoodsList ({ commit }, params) {
    commit(types.COM_SHOW_LOADING, true)
    api.GetGoodsList(params)
    .then(res => {
      commit(types.COM_SHOW_LOADING, false)
      commit(types.GET_GOODS_LIST, res.body.goodsList)
      commit(types.GET_SHOP_LOGO, res.body.userInfo.logo)
      commit(types.GET_SHOP_NAME, res.body.userInfo.shopName)
    })
  },
  setGoodsId ({ commit }, id) {
    commit(types.SET_GOODSID, id)
  }
}

const getters = {
  goodsList: state => state.goodsList,
  logo: state => state.logo,
  shopName: state => state.shopName,
  goodsId: state => state.goodsId
}

const mutations = {
  [types.GET_GOODS_LIST] (state, res) {
    state.goodsList = res
  },
  [types.GET_SHOP_LOGO] (state, res) {
    state.logo = res
  },
  [types.GET_SHOP_NAME] (state, res) {
    state.shopName = res
    document.title = res // 设置标题
  },
  [types.SET_GOODSID] (state, id) {
    state.goodsId = id
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
