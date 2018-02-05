import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

// import HelloWorld from '@/components/HelloWorld'
// import design from '@/views/design'
import Login from '@/views/Login'
import List from '@/views/List'
import Customized from '@/views/Customized'
import Total from '@/views/Total'
import Address from '@/views/Address'
import AddAddress from '@/views/AddAddress'
import Pay from '@/views/Pay'
import User from '@/views/User'
import ShopCart from '@/views/ShopCart'
import PaySuccess from '@/views/PaySuccess'
import GoodsDetail from '@/views/GoodsDetail'
import PhoneCall from '@/views/PhoneCall'
import AddToCart from '@/views/AddToCart'

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'design',
    //   component: design
    // },
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/customized',
      name: 'Customized',
      component: Customized
    },
    {
      path: '/total',
      name: 'Total',
      component: Total
    },
    {
      path: '/shop-cart',
      name: 'ShopCart',
      component: ShopCart,
      meta: { requiresAuth: true }
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta: { requiresAuth: true }
    },
    {
      path: '/add-address',
      name: 'AddAddress',
      component: AddAddress,
      meta: { requiresAuth: true }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/pay-success',
      name: 'PaySuccess',
      component: PaySuccess
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: { requiresAuth: true }
    },
    {
      path: '/goods-detail',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/phone-call',
      name: 'PhoneCall',
      component: PhoneCall
    },
    {
      path: '/add-to-cart',
      name: 'AddToCart',
      component: AddToCart,
      meta: { requiresAuth: true }
    }
  ]
})

function GetQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return (r[2])
  }
  return null
}

// 获取域名id
vueRouter.beforeEach((to, from, next) => {
  if (to.name === 'List') {
    if (!to.query.pay) {
      store.dispatch('setCode', GetQueryString('code'))
      let domain = ''
      if (!!to.query.domain) {
        domain = to.query.domain
      }
      store.dispatch('setDomain', domain)
    }
  }
  // 登录状态判断
  let loginStatus = store.state.user.loginStatus

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loginStatus) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }

  // if (!loginStatus && to.path.indexOf('login') === -1) {
  //   return next('/login')
  // } else {
  //   return next()
  // }
})

export default vueRouter
