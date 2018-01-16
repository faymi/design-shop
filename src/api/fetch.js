import axios from 'axios'

// 请求格式化
axios.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = {
      _t: new Date().getTime(),
      params: config.params
    }
  }
  return config
}, (error) => {
  // _.toast("错误的传参", 'fail')
  return Promise.reject(error)
})

// axios.interceptors.response.use((res) => {
//   if (!res.data.success) {
//     // _.toast(res.data.msg)
//     return Promise.reject(res)
//   }
//   return res
// }, (error) => {
//   // _.toast("网络异常", 'fail')
//   return Promise.reject(error)
// })

// 封装get和post请求
export function fetch (method, url, params) {
  if (method === 'get') {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .then(error => {
        reject(error)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(error => {
        reject(error)
      })
    })
  }
}

// 请求api集散中心
export default {
  // 登录
  Login (params) {
    return fetch('get', '/ideat/login', params)
  },
  // 获取用户信息
  GetUserInfo (params) {
    return fetch('get', '/ideat/', params)
  },
  // 获取商品列表
  GetGoodsList (params) {
    return fetch('get', '/ideat/commonManage/getGoodsList', params)
  },
  // 获取商品信息
  getGoodsInfo (params) {
    return fetch('get', '/ideat/commonManage/getGoodsInfo', params)
  },
  // 获取商品详情
  getGoodsDetail (params) {
    return fetch('get', '/ideat/commonManage/getGoodsDetail', params)
  },
  // 获取商品颜色
  getgoodsColor (params) {
    return fetch('get', '/ideat/commonManage/getColor', params)
  },
  // 获取收货地址
  getOrderAddress (params) {
    return fetch('get', '/ideat/commonManage/getOrderAddress', params)
  },
  // 添加收货地址
  addOrderAddress (params) {
    return fetch('post', '/ideat/commonManage/addOrderAddress', params)
  },
  // 删除收货地址
  deleteAddress (params) {
    return fetch('post', '/ideat/commonManage/deleteOrderAddress', params)
  },
  // 直接下单
  addSingleOrder (params) {
    return fetch('post', '/ideat/commonManage/addSingleOrder', params)
  },
  // 购物车下单
  addMultiOrder (params) {
    return fetch('post', '/ideat/commonManage/addMultiOrder', params)
  },
  // 添加购物车
  addShopCart (params) {
    return fetch('post', '/ideat/commonManage/addCartGoods', params)
  },
  // 获取购物车列表数据
  getShopCartList (params) {
    return fetch('get', '/ideat/commonManage/getCartGoods', params)
  },
  // 删除购物车某一件商品
  deleteCartRecordId (params) {
    return fetch('post', '/ideat/commonManage/deleteCartGoods', params)
  },
  // 获取订单列表
  getOrderList (params) {
    return fetch('get', '/ideat/commonManage/getOrderList', params)
  },
  // 获取订单详情
  getOrderDetail (params) {
    return fetch('get', '/ideat/commonManage/getOrderDetail', params)
  }
}
