import * as types from '../types'

// App通用配置

const state = {
  showAlert: false,
  alertMsg: '退出登录',
  loadingMsg: '正在加载',
  showLoading: false
}

const actions = {
  showAlert ({ commit }, status) {
    commit(types.COM_SHOW_ALERT, status)
  },
  alertMsg ({ commit }, msg) {
    commit(types.COM_ALERT_MSG, msg)
  },
  loading ({ commit }, msg) {
    commit(types.COM_LOADING, msg)
  },
  showLoading ({ commit }, status) {
    commit(types.COM_SHOW_LOADING, status)
  }
}

const getters = {
  showAlert: state => state.showAlert,
  showLoading: state => state.showLoading
}

const mutations = {
  [types.COM_SHOW_ALERT] (state, status) {
    state.showAlert = status
  },
  [types.COM_ALERT_MSG] (state, msg) {
    state.alertMsg = msg
  },
  [types.COM_LOADING] (state, msg) {
    state.loadingMsg = msg
  },
  [types.COM_SHOW_LOADING] (state, status) {
    state.showLoading = status
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
