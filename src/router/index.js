import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import design from '@/views/design'
import List from '@/views/List'

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
    }
  ]
})
