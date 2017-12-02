import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import design from '@/views/design'
import List from '@/views/List'
import Customized from '@/views/Customized'

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
    }
  ]
})
