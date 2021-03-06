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
    path: '/songs',
    component: () => import(/* webpackChunkName: "songs" */ './screens/Songs.vue'),
    name: 'songs',
    meta: { requiresAuth: true }
  },
  {
    path: '/songs/:id',
    component: () => import(/* webpackChunkName: "song" */ './screens/Song.vue'),
    name: 'song',
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/lyrics/:id',
    component: () => import(/* webpackChunkName: "lyric" */ './screens/Lyric.vue'),
    name: 'lyric',
    props: true,
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
  {
    path: '/forget',
    component: () => import(/* webpackChunkName: "forget" */ './screens/Forget.vue'),
    name: 'forget'
  },
]

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export default router;