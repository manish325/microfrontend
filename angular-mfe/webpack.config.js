const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.app.json'),
  [/* mapped paths to share */
    "./src/app/header/header.component.ts"
  ]);

module.exports = {
  output: {
    uniqueName: "angularMfe",
    publicPath: "http://localhost:4201/"
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
        library: { type: "module" },

        name: "angularMfe",
        filename: "remoteEntry.js",
        exposes: {
            './angularMFE': './src/app/app.module.ts',
            "./header" : "./src/app/header/header.component.ts",
            "./auth-module" : "./src/app/auth/auth.module.ts",
            "./define-elements" : "./src/utils/defineComponents.ts"
        },
        remotes : {
          "./angularContainer"  : "angularContainer@http://localhost:4200/remoteEntry.js"
        },      

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
