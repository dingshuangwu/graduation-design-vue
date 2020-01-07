import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, getName, getJurisdiction, getImageUrl } from '../utils/auth'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: getToken(),
    name: getName(),
    jurisdiction: getJurisdiction(),
    imageUrl: getImageUrl()
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_JURISDICTION(state, jurisdiction) {
      state.jurisdiction = jurisdiction
    },
    SET_IMAGEURL(state, imageUrl) {
      state.imageUrl = imageUrl
    }
  }
})

export default store
