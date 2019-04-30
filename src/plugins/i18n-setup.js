import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '../store/store';

import fr from '../locales/fr.json';

Vue.filter('capitalize', function(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.use(VueI18n);

let locale = store.state.lang;
let messages = { fr };

// set HTML Attribute at startup
document.getElementsByTagName('html')[0].lang = locale;

if (locale != 'fr') {
  import(/* webpackChunkName: "lang-[request]" */ `@/locales/${locale}.json`).then(
    res => {
      messages[locale] = res;
    }
  );
}

const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'fr',
  messages: messages
});

export default i18n;
