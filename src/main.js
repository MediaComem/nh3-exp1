/* General */
import 'babel-polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import axios from 'axios';

/* Plugin */

import i18n from './plugins/i18n-setup';

import VueStatic from 'vue-static';
Vue.use(VueStatic);

import VueOffline from 'vue-offline';
Vue.use(VueOffline);

/* API */

Vue.config.productionTip = process.env.NODE_ENV === 'production';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + process.env.VUE_APP_API_GENERAL_TOKEN;

export const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app');
