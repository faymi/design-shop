import store from '@/store/index'

/**
 * alert 公共方法
 * 用法：import * as _ from '@/util/tool'
 *       _.alert('msg')
 */

export function alert (msg) {
  store.dispatch('showAlert', true)
  store.dispatch('alertMsg', msg)
  setTimeout(() => {
    store.dispatch('showAlert', false)
  }, 2000)
}

/**
 * loading 公共方法
 */
export function showLoading (msg) {
  store.dispatch('showLoading', true)
  store.dispatch('loading', msg)
}

export function closeLoading () {
  store.dispatch('showLoading', false)
  store.dispatch('loading', '正在加载')
}
