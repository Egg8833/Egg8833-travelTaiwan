import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/HomeView.vue'
import viewList from '../views/viewList.vue'
import viewPoint from '../page/viewPoint.vue'

const getDynamicBase = uri => {
  const BRANCH_REGEX = /^\/[a-z0-9-]+(\/\d{14}|\/\d{8}(_\w+)?)?/
  const match = uri.match(BRANCH_REGEX)
  return match ? match[0] : uri
}

const getBase = clientOnlyDynamicBase => {
  return clientOnlyDynamicBase(window.location.pathname)
}
const path = process.env.NODE_ENV === 'production' ? '/travelTaiwan/' : ''

const router = createRouter({
  history: createWebHistory(path),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/viewList',
      name: 'viewList',
      component: viewList,
    },
    {
      path: '/viewList/:id',
      name: 'viewPoint',
      component: viewPoint,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {name: 'home'},
    },
  ],
  scrollBehavior() {
    // always scroll to top
    return {top: 0}
  },
})

export default router
