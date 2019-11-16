/* eslint-disable prettier/prettier */
// FIXME
// const resolve = require('path').resolve; 

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: { lang: 'ru' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/components',
    '~plugins/vue-js-modal'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@bazzite/nuxt-optimized-images',
  ],
  styleResources: {
    // your settings here
    sass: [],
    scss: ['@/assets/scss/variables.scss'],
    less: [],
    stylus: []
  },
  optimizedImages: {
    inlineImageLimit: 1000,
    imagesName: ({ isDev }) => isDev ? '[path][name][hash:optimized].[ext]' : 'img/[hash:7].[ext]',
    responsiveImagesName: ({ isDev }) => isDev ? '[path][name]--[width][hash:optimized].[ext]' : 'img/[hash:7]-[width].[ext]',
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    defaultImageLoader: 'img-loader',
    mozjpeg: {
      quality: 80,
    },
    optipng: {
      optimizationLevel: 3,
    },
    pngquant: false,
    gifsicle: {
      interlaced: true,
      optimizationLevel: 3,
    },
    svgo: {
      // enable/disable svgo plugins here
    },
    webp: {
      preset: 'default',
      quality: 75,
    },
  },
    /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },
  generate: {
    dir: 'public'
  }
}
