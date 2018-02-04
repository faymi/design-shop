import * as types from '../types'

const state = {
  code: '', // 授权返回的code
  openid: '', // openid
  domain: '', // 域名id
  customerId: '', // 登录用户id
  loginStatus: false, // 登录状态
  shopCartId: '', // 购物车id
  frontMadeImg: '', // 正面定制图片
  backMadeImg: '', // 反面定制图片
  colorId: '', // 商品颜色id
  goodInfo: {}, // 单个商品信息
  userAddressInfo: {} // 用户收货地址信息
}

const actions = {
  setCode ({commit}, code) {
    commit(types.SET_CODE, code)
  },
  setOpenid ({ commit }, openid) {
    commit(types.SET_OPENID, openid)
  },
  setDomain ({ commit }, domain) {
    commit(types.SET_DOMAIN, domain)
  },
  setCustomerId ({ commit }, id) {
    commit(types.SET_CUSTOMER_ID, id)
  },
  setLoginStatus ({ commit }, status) {
    commit(types.SET_LOGIN_STATUS, status)
  },
  setShopCartId ({ commit }, id) {
    commit(types.SET_SHOPCART_ID, id)
  },
  setMadeImg ({ commit }, data) {
    commit(types.SET_MADE_IMG, data)
  },
  setGoodsInfo ({ commit }, goodsInfo) {
    commit(types.SET_GOODS_INFO, goodsInfo)
  },
  setUserAddressInfo ({ commit }, data) {
    commit(types.SET_USER_ADDRESS_INFO, data)
  }
}

const getters = {
  code: state => state.code,
  openid: state => state.openid,
  domain: state => state.domain,
  customerId: state => state.customerId,
  loginStatus: state => state.loginStatus,
  shopCartId: state => state.shopCartId,
  frontMadeImg: state => state.frontMadeImg,
  backMadeImg: state => state.backMadeImg,
  goodsInfo: state => state.goodsInfo,
  userAddressInfo: state => state.userAddressInfo
}

const mutations = {
  [types.SET_CODE] (state, code) {
    state.code = code
  },
  [types.SET_OPENID] (state, openid) {
    state.openid = openid
  },
  [types.SET_DOMAIN] (state, domain) {
    state.domain = domain
  },
  [types.SET_CUSTOMER_ID] (state, id) {
    state.customerId = id
  },
  [types.SET_LOGIN_STATUS] (state, status) {
    state.loginStatus = status
  },
  [types.SET_SHOPCART_ID] (state, id) {
    state.shopCartId = id
  },
  [types.SET_MADE_IMG] (state, data) {
    state.frontMadeImg = data.frontMadeImg
    state.backMadeImg = data.backMadeImg
  },
  [types.SET_GOODS_INFO] (state, goodsInfo) {
    state.goodsInfo = goodsInfo
  },
  [types.SET_USER_ADDRESS_INFO] (state, data) {
    state.userAddressInfo = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
