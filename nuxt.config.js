import colors from "vuetify/es5/util/colors";

var appName = "Alice System",
  appDescription =
    "Aplikasi ERP mini yang dibangun dengan memperhatikan kemudahan penggunaan bagi pengguna yang awam sekalipun. Aplikasi ini ditujukan untuk perusahaan dengan skala kecil dan menengah.";

export default {
  mode: "universal",
  /**
   * Environment variables
   */
  env: {
    appName: appName,
    appDescription: appDescription
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + appName,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    '@mdi/font/css/materialdesignicons.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/axios"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "http://gateway.local/auth/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "http://gateway.local/auth/logout", method: "post" },
          user: {
            url: "http://gateway.local/auth/user-by-me",
            method: "get",
            propertyName: false
          }
        },
        tokenRequired: true,
        tokenName: "Authorization",
        tokenType: "Bearer"
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
};
