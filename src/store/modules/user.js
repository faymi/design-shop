import * as types from '../types'

const state = {
  domain: '', // 域名id
  customerId: 'linzhanhong', // 登录用户id
  shopCartId: '1', // 购物车id
  frontMadeImg: '', // 正面定制图片
  backMadeImg: '', // 反面定制图片
  colorId: '', // 商品颜色id
  goodInfo: {}, // 单个商品信息
  userAddressInfo: {} // 用户收货地址信息
}

const actions = {
  setDomain ({ commit }, domain) {
    commit(types.SET_DOMAIN, domain)
  },
  setCustomerId ({ commit }, id) {
    commit(types.SET_CUSTOMER_ID, id)
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
  domain: state => state.domain,
  customerId: state => state.customerId,
  shopCartId: state => state.shopCartId,
  frontMadeImg: state => state.frontMadeImg,
  backMadeImg: state => state.backMadeImg,
  goodsInfo: state => state.goodsInfo,
  userAddressInfo: state => state.userAddressInfo
}

const mutations = {
  [types.SET_DOMAIN] (state, domain) {
    state.domain = domain
  },
  [types.SET_CUSTOMER_ID] (state, id) {
    state.customerId = id
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
