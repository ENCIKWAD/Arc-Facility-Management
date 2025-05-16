module.exports = {
  transpileDependencies: [],
  devServer: {
    proxy: "http://localhost:3000",
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
};