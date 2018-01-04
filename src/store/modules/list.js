import * as types from '../types'
import api from '@/api/fetch'

const state = {
  goodsList: [
    {
      shirt_src: require('@/assets/txu.jpg'),
      name: '纯棉T恤',
      price: 69
    },
    {
      shirt_src: require('@/assets/txu.jpg'),
      name: '纯棉T恤',
      price: 69
    },
    {
      shirt_src: require('@/assets/txu.jpg'),
      name: '纯棉T恤',
      price: 69
    },
    {
      shirt_src: require('@/assets/txu.jpg'),
      name: '纯棉T恤',
      price: 69
    },
    {
      shirt_src: require('@/assets/txu.jpg'),
      name: '纯棉T恤',
      price: 69
    },
    {
      shirt_src: require('@/assets/txu.jpg'),
      name: '纯棉T恤',
      price: 69
    },
    {
      shirt_src: require('@/assets/txu.jpg'),
      name: '纯棉T恤',
      price: 69
    }
  ]
}

const actions = {
  getGoodsList ({ commit }, params) {
    commit(types.COM_SHOW_LOADING, true)
    api.GetGoodsList(params)
    .then(res => {
      commit(types.COM_SHOW_LOADING, false)
      commit(types.GET_GOODS_LIST, res)
    })
  }
}

const getters = {
  goodsList: state => state.goodsList
}

const mutations = {
  [types.GET_GOODS_LIST] (state, res) {
    state.goodsList = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
