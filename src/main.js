import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import { auth } from './firebase'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const authenticatedUser = auth.currentUser
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !authenticatedUser) {
    console.log('You are not authorized to access this area.')
    next('login')
  } else {
    next()
  }
})

let app
auth.onAuthStateChanged((user) => {
  if (!app) {
    store.commit("user", user)
    new Vue({
      vuetify,
      store,
      router,
      render: (h) => h(App),
    }).$mount('#app')
  }
})
