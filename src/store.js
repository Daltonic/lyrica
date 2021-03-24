import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    drawer: false,
    snackbar: {
      msg: '',
      show: false
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    snackbar: (state, payload) => (state.snackbar = payload),
  },
  actions: {
    closeSnackbar(state, payload = {}) {
      payload.show = false
      payload.msg = ''
      state.commit("snackbar", payload)
    },
  },
  getters: {
    drawer: state => state.drawer,
    snackbar: state => state.snackbar,
  }
})

export default store