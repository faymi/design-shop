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
  Login (params) {
    return fetch('get', '/ideat/login', params)
  },
  GetGoodsList (params) {
    return fetch('get', '/ideat/commonManage/getGoodsList', params)
  }
}
