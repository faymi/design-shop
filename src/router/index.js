import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import design from '@/views/design'
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

export default new Router({
  routes: [
    {
      path: '/',
      name: 'design',
      component: design
    },
    {
      path: '/list',
      name: 'List',
      component: List
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
      component: ShopCart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/add-address',
      name: 'AddAddress',
      component: AddAddress
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
      component: User
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
      component: AddToCart
    }
  ]
})
