import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import OrderManage from '@/views/OrderManage'
import AccountManage from '@/views/AccountManage'
import CustomManage from '@/views/CustomManage'
import IncomeManage from '@/views/IncomeManage'
import GoodsManage from '@/views/GoodsManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/orderManage',
      name: 'OrderManage',
      component: OrderManage
    },
    {
      path: '/goodsManage',
      name: 'GoodsManage',
      component: GoodsManage
    },
    {
      path: '/accountManage',
      name: 'AccountManage',
      component: AccountManage
    },
    {
      path: '/customManage',
      name: 'CustomManage',
      component: CustomManage
    },
    {
      path: '/incomeManage',
      name: 'IncomeManage',
      component: IncomeManage
    }
  ]
})
