import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Lyrics" */ './screens/Lyrics.vue'),
    name: 'lyrics',
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ './screens/Profile.vue'),
    name: 'profile',
    meta: { requiresAuth: true }
  },
  {
    path: '/create',
    component: () => import(/* webpackChunkName: "Create" */ './screens/Create.vue'),
    name: 'create',
    meta: { requiresAuth: true }
  },
  {
    path: '/backup',
    component: () => import(/* webpackChunkName: "backup" */ './screens/Backup.vue'),
    name: 'backup',
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    component: () => import(/* webpackChunkName: "settings" */ './screens/Settings.vue'),
    name: 'settings',
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ './screens/Login.vue'),
    name: 'login'
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "register" */ './screens/Register.vue'),
    name: 'register'
  },
]

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export default router;