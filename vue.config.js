module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: false
    },
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  },
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true
    }
  }
};
