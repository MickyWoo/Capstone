module.exports = {
  "publicPath": "",
  "outputDir": "docs",
  "transpileDependencies": [
    "vuetify"
  ],

  // https://stackoverflow.com/questions/54765638/vue-cli3-enable-cors
  devServer: {
    proxy: 'https://newsapi.org',
    headers: { "Access-Control-Allow-Origin": "*" }
},
}