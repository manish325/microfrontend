const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;
const deps = require("./package.json").dependencies;
const sharedDependencies = Object.keys(deps).reduce((acc, key) => {
  acc[key] = { singleton: true, strictVersion: true, requiredVersion: deps[key] }; // Use actual version
  return acc;
}, {});


const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.app.json'),
  [/* mapped paths to share */
    "./src/app/store/store.ts",
    "./src/app/store/slice.ts",
    "./package.json"
  ]);

module.exports = {
  output: {
    uniqueName: "angularContainer",
    publicPath: "http://localhost:4200/"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'angularContainer',
      filename: 'remoteEntry.js',
      exposes: {
        "./store": "./src/app/store/store.ts",
        "./slice": "./src/app/store/slice.ts"
      },
      remotes: {
        "angularMfe": "angularMfe@http://localhost:4201/remoteEntry.js",
        "react"  : "react@http://localhost:4204/remoteEntry.js"
      },
      shared: {
        // ...sharedDependencies, // Dynamically added shared dependencies
        ...share({
          "redux": { singleton: true, strictVersion: true, requiredVersion: deps["redux"] },
          "@reduxjs/toolkit": { singleton: true, strictVersion: true, requiredVersion: deps["@reduxjs/toolkit"] },
          "react-redux": { singleton: true, strictVersion: true, requiredVersion: deps["react-redux"] },

          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
      }

    }),
    sharedMappings.getPlugin()
  ],
};
