/* General */
import 'babel-polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';

/* Plugin */

import i18n from './plugins/i18n-setup';

import VueStatic from 'vue-static';
Vue.use(VueStatic);

import VueOffline from 'vue-offline';
Vue.use(VueOffline);

/* API */

Vue.config.productionTip = process.env.NODE_ENV === 'production';

export const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app');
