import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: '',
    name: '',
    jurisdiction: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setName(state, name) {
      state.name = name
    },
    setJurisdiction(state, jurisdiction) {
      state.jurisdiction = jurisdiction
    }
  }
})

export default store
