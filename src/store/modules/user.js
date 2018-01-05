import * as types from '../types'

const state = {
  frontMadeImg: '',
  backMadeImg: ''
}

const actions = {
  setMadeImg ({ commit }, data) {
    commit(types.SET_MADE_IMG, data)
  }
}

const getters = {
  frontMadeImg: state => state.frontMadeImg,
  backMadeImg: state => state.backMadeImg
}

const mutations = {
  [types.SET_MADE_IMG] (state, data) {
    state.frontMadeImg = data.frontMadeImg
    state.backMadeImg = data.backMadeImg
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
