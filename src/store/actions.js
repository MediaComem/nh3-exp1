import axios from 'axios';
import { app } from '../main';
import unidid from 'uniqid';

export default {
  async setLang({ commit }, payload) {
    if (payload in app.$i18n.messages) {
      commit('SET_LANG', payload);
    } else {
      try {
        const res = await import(`../locales/${payload}.json`);
        app.$i18n.setLocaleMessage(payload, res.default);
        commit('SET_LANG', payload);
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  },
  async loadImages({ commit, state, dispatch }, defaultLang) {
    commit('SET_GLOBAL_LOADING', true);

    let lang =
      (defaultLang !== undefined && defaultLang === true) || state.lang === 'fr'
        ? ''
        : `_${state.lang}`;

    try {
      let res = await axios.post(`/collections/get/exp1_images${lang}`, {
        simple: 1,
        filter: { published: true },
        fields: {
          _id: 0,
          idnh: 1,
          title: 1,
          year: 1,
          author: 1,
          rights: 1,
          image: 1
        },
        limit: state.options.imagesSetLimit,
        skip: 0
      });

      commit('LOAD_IMAGES', await res.data);
      await commit('SET_GLOBAL_LOADING', false);
    } catch (log) {
      if (log.response.data.error === 'Collection not found') {
        console.log(`Collection ${state.lang} not found`);
        await dispatch('loadImages', true);
      }
    }
  },
  async getStats({ commit, state }) {
    try {
      let res = await axios.post('/collections/get/exp1_stats', {
        simple: 1,
        yearsInterval: state.round.stats.yearsInterval,
        filter: { idnh: state.round.media.idnh }
      });

      commit('SET_ROUND_STATS', await res.data);
    } catch (err) {
      console.log('getStats', err);
    }
  },
  storeRoundDone({ commit }, payload) {
    commit('ADD_ROUND_DONE', payload);

    axios.post('/collections/save/exp1_stats', {
      data: payload
    });
  },
  createUserId({ commit }) {
    commit('SET_USER_ID', unidid());
  },
  async getSummaryTempImg({ commit, state }, imgId, defaultLang) {
    let lang =
      (defaultLang !== undefined && defaultLang === true) || state.lang === 'fr'
        ? ''
        : `_${state.lang}`;

    try {
      let res = await axios.post(`/collections/get/exp1_images${lang}`, {
        filter: { idnh: imgId },
        simple: 1,
        fields: {
          title: 1,
          year: 1,
          author: 1,
          rights: 1,
          image: 1
        }
      });
      commit('SET_ROUND_MEDIA', await res.data[0]);
    } catch (log) {
      if (log.response.data.error === 'File not found') {
        console.log(`Item in Collection ${state.lang} not found`);
        await dispatch('getSummaryTempImg', imgId, true);
      }
    }
  },
  async getTop({ commit, state }) {
    try {
      let res = await axios.post('/collections/get/exp1_classement', {
        simple: 1,
        limit: state.options.rankingLimit,
        sort: { score: -1 }
      });

      commit('SET_TOP', await res.data);
    } catch (err) {
      console.log('getTop', err);
    }
  },
  async storeScoreTop({ commit, state }) {
    commit('SET_SCORE_SUBMITTED', true);
    try {
      await axios.post('/collections/save/exp1_classement', {
        data: {
          userId: state.user.id,
          username: state.user.name,
          score: state.score.last
        }
      });
    } catch (err) {
      console.log('storeScoreTop', err);
    }
  }
};
