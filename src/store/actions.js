import axios from "axios";
import { app } from "../main";
import unidid from "uniqid";

export default {
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
  async loadImages({ commit, state }) {
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
      lang: state.lang
    });

    commit("LOAD_IMAGES", await res.data);
  },
  storeRoundStat({ commit }, payload) {
    commit("SET_ROUND_STAT", payload);

    axios.post("/collections/save/exp1_stats", {
      data: payload
    });
  },
  createUserId({ commit }) {
    commit("SET_USER_ID", unidid());
  },
  async getSummaryTempImg({ commit, state }, imgId) {
    let res = await axios.post("/collections/get/exp1_images", {
      filter: { id: imgId },
      simple: 1,
      fields: {
        title: 1,
        year: 1,
        author: 1,
        rights: 1,
        image: 1
      },
      lang: state.lang
    });

    commit("SET_ROUND_IMAGE", await res.data[0]);
  },
  async getTop10({ commit }) {
    let res = await axios.post("/collections/get/exp1_classement", {
      simple: 1,
      limit: 10,
      sort: { score: -1 }
    });

    commit("SET_TOP10", await res.data);
  }
};
