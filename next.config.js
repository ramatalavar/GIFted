const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
module.exports = {
  target: "serverless",
  publicRuntimeConfig: {
    API_KEY: "T2pT6xr6DtV3Q9SSXBJRHiQyK7gYTHJc"
  },
  webpack: config => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: "networkFirst",
            urlPattern: /^http?.*/
          }
        ]
      })
    );

    return config;
  }
};
