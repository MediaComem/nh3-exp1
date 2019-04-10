import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import getDefaultState from './states';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: getDefaultState(),
  getters: getters,
  mutations: mutations,
  actions: actions,
  plugins: [
    new VuexPersistence({
      reducer: state => ({
        lang: state.lang,
        user: state.user,
        replayCount: state.replayCount,
        round: state.round,
        game: state.game,
        imagesSet: state.imagesSet,
        roundDone: state.roundDone,
        score: state.score
      }),
      storage: window.localStorage
    }).plugin
  ]
});
