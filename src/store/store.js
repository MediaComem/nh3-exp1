import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import VuexPersistence from "vuex-persist";
import axios from "axios";
import { app } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // By default check navigator lang
    lang:
      navigator.language.split("-")[0] || navigator.userLanguage.split("-")[0]
  },
  getters: {},
  mutations: {
    [types.SET_LANG](state, payload) {
      state.lang = payload;
      app.$i18n.locale = payload;
      axios.defaults.headers.common["Accept-Language"] = payload;
      document.querySelector("html").setAttribute("lang", payload);
    }
  },
  actions: {
    async setLang({ commit }, payload) {
      if (payload in app.$i18n.messages) {
        commit(types.SET_LANG, payload);
      } else {
        try {
          const res = await import(`../locales/${payload}.json`);
          app.$i18n.setLocaleMessage(payload, res.default);
          commit(types.SET_LANG, payload);
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    }
  },
  plugins: [new VuexPersistence({ storage: window.localStorage }).plugin]
});
