import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Lyrics" */ './screens/Lyrics.vue'),
    name: 'lyrics'
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ './screens/Profile.vue'),
    name: 'profile'
  },
  {
    path: '/create',
    component: () => import(/* webpackChunkName: "Create" */ './screens/Create.vue'),
    name: 'create'
  },
  {
    path: '/backup',
    component: () => import(/* webpackChunkName: "backup" */ './screens/Backup.vue'),
    name: 'backup'
  },
  {
    path: '/settings',
    component: () => import(/* webpackChunkName: "settings" */ './screens/Settings.vue'),
    name: 'settings'
  },
]

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export default router;