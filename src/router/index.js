import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Design from '@/views/design'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Design',
      component: Design
    }
  ]
})
