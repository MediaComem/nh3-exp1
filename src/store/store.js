import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import getters from "./getters";
import actions from "./actions";
import * as types from "./mutation-types";
import axios from "axios";
import { app } from "../main";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    // By default check navigator lang
    lang:
      navigator.language.split("-")[0] || navigator.userLanguage.split("-")[0],
    user: {
      name: null,
      id: null
    },
    loading: false,
    firstTime: true,
    round: {
      year: {
        begin: new Date().getFullYear() - 200,
        end: new Date().getFullYear(),
        selected: 0
      },
      media: {
        author: null,
        title: null,
        year: null,
        rights: null,
        idnh: null,
        image: {
          _id: null
        }
      }
    },
    game: {
      running: false,
      number: 0,
      chrono: {
        init: 10, //sec
        bonus: 1, //sec
        penalty: -1, //sec
        penaltyCoefficient: 10,
        currentVal: 0, //sec
        currentBonusPenalty: 0, //sec
        timesUp: false,
        running: false,
        instance: null
      }
    },
    imagesSet: [],
    roundDone: [],
    lastScore: null,
    ranking: [],
    dpiRange: [0.5, 1, 1.5, 2, 2.5, 3, 4]
  };
};

export default new Vuex.Store({
  state: getDefaultState(),
  getters: getters,
  mutations: {
    [types.SET_LANG](state, payload) {
      state.lang = payload;
      app.$i18n.locale = payload;
      axios.defaults.headers.common["Accept-Language"] = payload;
      document.querySelector("html").setAttribute("lang", payload);
    },
    [types.SET_GLOBAL_LOADING](state, payload) {
      state.loading = payload;
    },
    [types.SET_USER_ID](state, payload) {
      state.user.id = payload;
    },
    [types.LOAD_IMAGES](state, payload) {
      state.imagesSet = payload;
    },
    [types.SET_FIRST_TIME](state, payload) {
      state.firstTime = payload;
    },
    [types.SET_GAME_STATE](state, payload) {
      state.game.running = payload;
    },
    [types.SET_NEW_GAME](state) {
      state.game.number += 1;
    },
    [types.RESET_CHRONO](state) {
      state.game.chrono = getDefaultState().game.chrono;
    },
    [types.INIT_CHRONO](state) {
      state.game.chrono.currentVal = state.game.chrono.init;
    },
    [types.SET_CHRONO_RUNNING](state, payload) {
      state.game.chrono.running = payload;
    },
    [types.SET_INTERVAL_CHRONO](state) {
      state.game.chrono.currentVal -= 1;
    },
    [types.STORE_CHRONO](state, payload) {
      state.game.chrono.instance = payload;
    },
    [types.TIMESUP](state, payload) {
      state.game.chrono.timesUp = payload;
    },
    [types.RESET_ROUND](state) {
      state.round = getDefaultState().round;
    },
    [types.SET_ROUND_IMAGE](state, payload) {
      state.round.media = payload;
    },
    [types.SET_YEAR_SELECTED](state, payload) {
      state.round.year.selected = payload;
    },
    [types.SET_ROUND_STAT](state, payload) {
      state.roundDone.push(payload);
    },
    [types.ADD_CHRONO_BONUS](state) {
      state.game.chrono.currentBonusPenalty = state.game.chrono.bonus;
      state.game.chrono.currentVal += state.game.chrono.bonus;
    },
    [types.ADD_CHRONO_PENALTY](state, penalty) {
      state.game.chrono.currentBonusPenalty = penalty;
      state.game.chrono.currentVal += penalty;
    },
    [types.SET_LAST_GAME_SCORE](state, score) {
      state.lastScore = score;
    },
    [types.SET_TOP10](state, payload) {
      state.ranking = payload;
    }
  },
  actions: actions,
  plugins: [new VuexPersistence({ storage: window.localStorage }).plugin]
});
