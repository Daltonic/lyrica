import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    drawer: false,
    snackBar: {
      msg: '',
      color: '',
      show: false
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    setSnackBar: (state, payload) => (state.snackBar = payload),
  },
  actions: {
    // drawer: (state, payload) => state.commit('drawer', payload),
  },
  getters: {
    drawer: state => state.drawer,
    snackBar: state => state.snackBar,
  }
})

export default store