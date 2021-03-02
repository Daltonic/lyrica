import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    drawer: false,
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
  },
  actions: {
    // drawer: (state, payload) => state.commit('drawer', payload),
  },
  getters: {
    drawer: state => state.drawer,
  }
})

export default store