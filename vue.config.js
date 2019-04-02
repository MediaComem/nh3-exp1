module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true
    }
  }
};
