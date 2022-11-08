import { make } from 'vuex-pathify'
import axios from 'axios'

const state = {
  all: [],
  loaded: false
}

const getters = {
  ...make.getters(state)
}
const mutations = {
  ...make.mutations(state)
}

const actions = {
  ...make.actions(state),
  load({ commit }) {
    return axios
      .get(
        `/api/method/erpx_prulia.prulia_news.doctype.prulia_banner.prulia_banner.get_banner`
      )
      .then(responses => {
        let { data } = responses
        let { message } = data

        commit('SET_ALL', message || [])
        commit('SET_LOADED', true)
        return true
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
