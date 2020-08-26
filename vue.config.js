module.exports = {
  "publicPath": "",
  "outputDir": "docs",
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'http://newsapi.org',
}
}