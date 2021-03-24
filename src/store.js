import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    drawer: false,
    user: null,
    snackbar: {
      msg: '',
      show: false
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    user: (state, payload) => (state.user = payload),
    snackbar: (state, payload) => (state.snackbar = payload),
  },
  actions: {
    closeSnackbar(state, payload = {}) {
      payload.show = false
      payload.msg = ''
      state.commit("snackbar", payload)
    },
    clearUser: (state) => (state.commit("user", null)),
  },
  getters: {
    drawer: state => state.drawer,
    user: state => state.user,
    snackbar: state => state.snackbar,
  }
})

export default store