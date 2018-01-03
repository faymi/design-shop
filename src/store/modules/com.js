import * as types from '../types'

// App通用配置

const state = {
  showAlert: false,
  alertMsg: '退出登录'
}

const actions = {
  showAlert ({ commit }, status) {
    commit(types.COM_SHOW_ALERT, status)
  },
  alertMsg ({ commit }, msg) {
    commit(types.COM_ALERT_MSG, msg)
  }
}

const getters = {
  showAlert: state => state.showAlert
}

const mutations = {
  [types.COM_SHOW_ALERT] (state, status) {
    state.showAlert = status
  },
  [types.COM_ALERT_MSG] (state, msg) {
    state.alertMsg = msg
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
