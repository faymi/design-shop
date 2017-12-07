import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import OrderManage from '@/views/OrderManage'
import AccountManage from '@/views/AccountManage'
import CustomManage from '@/views/CustomManage'
import IncomeManage from '@/views/IncomeManage'
import GoodsManage from '@/views/GoodsManage'
import AccountInfo from '@/views/AccountInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
    },
    {
      path: '/accountInfo',
      name: 'AccountInfo',
      component: AccountInfo
    }
  ]
})
