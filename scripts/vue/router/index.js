import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/base'
import Compare from '../components/compare'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'base',
      component: Home,
    },
    {
      path: '/compare',
      name: 'compare',
      component: Compare,
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})