module.exports = {
  "publicPath": "",
  "outputDir": "docs",
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'https://newsapi.org',
}
}