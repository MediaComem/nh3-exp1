import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import VuexPersistence from "vuex-persist";
import axios from "axios";
import { app } from "../main";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    // By default check navigator lang
    lang:
      navigator.language.split("-")[0] || navigator.userLanguage.split("-")[0],
    username: null,
    play: {
      year: {
        begin: new Date().getFullYear() - 200,
        end: new Date().getFullYear(),
        selected: 0
      },
      chrono: {
        init: 15, //sec
        currentVal: 0, //sec
        timesUp: false,
        started: false,
        instance: null
      },
      currentImg: {
        author: null,
        title: null,
        year: null,
        rights: null,
        id: null,
        image: {
          id: null
        }
      }
    },
    imagesSet: [],
    imagesScore: [],
    loading: false,
    firstTime: true
  };
};

export default new Vuex.Store({
  state: getDefaultState(),
  getters: {
    imagesDone: state => {
      return state.imagesSet.filter(image =>
        state.imagesScore.find(score => score.id === image.id)
      );
    },
    imagesToDo: state => {
      return state.imagesSet.filter(
        image => !state.imagesScore.find(score => score.id === image.id)
      );
    }
  },
  mutations: {
    [types.SET_LANG](state, payload) {
      state.lang = payload;
      app.$i18n.locale = payload;
      axios.defaults.headers.common["Accept-Language"] = payload;
      document.querySelector("html").setAttribute("lang", payload);
    },
    [types.SET_YEAR_SELECTED](state, payload) {
      state.play.year.selected = payload;
    },
    [types.INIT_CHRONO](state) {
      state.play.chrono.currentVal = state.play.chrono.init;
    },
    [types.START_CHRONO](state, payload) {
      state.play.chrono.started = payload;
    },
    [types.SETINTERVAL_CHRONO](state) {
      state.play.chrono.currentVal -= 1;
    },
    [types.STORE_CHRONO](state, payload) {
      state.play.chrono.instance = payload;
    },
    [types.TIMESUP](state, payload) {
      state.play.chrono.timesUp = payload;
    },
    [types.RESET_PLAYSTATE](state) {
      state.play = getDefaultState().play;
    },
    [types.LOAD_IMAGES](state, payload) {
      state.imagesSet = payload;
    },
    [types.SET_GLOBAL_LOADING](state, payload) {
      state.loading = payload;
    },
    [types.SET_FIRSTTIME](state, payload) {
      state.firstTime = payload;
    },
    [types.SET_CURRENTIMG](state, payload) {
      state.play.currentImg = payload;
    }
  },
  actions: {
    async setLang({ commit }, payload) {
      if (payload in app.$i18n.messages) {
        commit("SET_LANG", payload);
      } else {
        try {
          const res = await import(`../locales/${payload}.json`);
          app.$i18n.setLocaleMessage(payload, res.default);
          commit("SET_LANG", payload);
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    },
    async loadImages({ commit }) {
      commit("SET_GLOBAL_LOADING", true);

      let res = await axios.post("/collections/get/exp1_images", {
        simple: 1,
        fields: {
          _id: 0,
          id: 1,
          title: 1,
          year: 1,
          author: 1,
          rights: 1,
          image: 1
        },
        limit: 100,
        skip: 0,
        lang: "fr"
      });

      commit("LOAD_IMAGES", await res.data);
    }
  },
  plugins: [new VuexPersistence({ storage: window.localStorage }).plugin]
});
