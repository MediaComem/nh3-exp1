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
  plugins: [new VuexPersistence({ storage: window.localStorage }).plugin]
});
