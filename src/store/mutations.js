import * as types from './mutation-types';
import axios from 'axios';
import { app } from '../main';

import getDefaultState from './states';

export default {
  [types.SET_LANG](state, payload) {
    state.lang = payload;
    app.$i18n.locale = payload;
    axios.defaults.headers.common['Accept-Language'] = payload;
    document.querySelector('html').setAttribute('lang', payload);
  },
  [types.SET_GLOBAL_LOADING](state, payload) {
    state.loading = payload;
  },
  [types.SET_USER_ID](state, payload) {
    state.user.id = payload;
  },
  [types.SET_USER_NAME](state, payload) {
    state.user.name = payload;
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
  [types.RESET_GAME](state) {
    state.game.number = 0;
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
  [types.SET_ROUND_MEDIA](state, payload) {
    state.round.media = payload;
  },
  [types.SET_YEAR_SELECTED](state, payload) {
    state.round.year.selected = payload;
  },
  [types.SET_ROUND_STATS](state, payload) {
    state.round.stats = payload;
  },
  [types.ADD_ROUND_DONE](state, payload) {
    state.roundDone.push(payload);
  },
  [types.ADD_CHRONO_BONUS](state, yearsDiff) {
    let penalty = Math.abs(
      yearsDiff *
        state.game.chrono.penalty *
        state.game.chrono.penaltyCoefficient
    );
    let limitedPenalty = Math.min(penalty, state.game.chrono.bonus);

    state.game.chrono.currentBonusPenalty =
      state.game.chrono.bonus - limitedPenalty;
    state.game.chrono.currentVal += state.game.chrono.currentBonusPenalty;
  },
  [types.SET_LAST_GAME_SCORE](state, score) {
    state.lastScore = score;
  },
  [types.SET_TOP](state, payload) {
    state.ranking = payload;
  },
  [types.SET_SCORE_SUBMITTED](state, payload) {
    state.lastScoreSubmitted = payload;
  },
  [types.SET_NEW_REPLAY](state) {
    state.replayCount += 1;
  }
};
