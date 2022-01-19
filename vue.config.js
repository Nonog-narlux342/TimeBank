
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/vuejs-pwa/" : "",

  configureWebpack: {
    plugins: [new GenerateSW()]
  }
};
module.exports = {
    pwa: {
      workboxPluginMode: "InjectManifest",
      workboxOptions: {
        swSrc: "src/service-worker.js"
      }
    }
  };