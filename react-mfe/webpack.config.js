const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const deps = require('./package.json').dependencies;


module.exports = options => {
  return {
    entry: './bootstrap.tsx',
    output: {
      filename: 'bundle.js',
      publicPath: "auto",
      uniqueName: "mfe4"
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/react', '@babel/env']
            }
          }],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',   // Injects styles into the DOM
            'css-loader',     // Turns CSS into CommonJS
            'sass-loader',    // Compiles Sass to CSS
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add .ts and .tsx
      // alias: {
      //   'react': path.resolve(__dirname, 'node_modules/react'),
      //   'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      // },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "react",
        library: {
          type: "var",
          name: "react"
        },
        filename: "remoteEntry.js", // <-- Meta Data
        exposes: {

          './web-components': './bootstrap.tsx',
          './react-component-1': './reactComponentOne.tsx',
          "./define-custom-elements" : "./defineCustomElements.ts"
        },
        remotes: {
          "mfe1": "mfe1@http://localhost:4201/remoteEntry.js",
          "angularContainer": "angularContainer@http://localhost:4200/remoteEntry.js"
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
          "react-router-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-router-dom"]
          },
        },
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: './*.html'
        }]
      })
    ],
    devServer: {
      port: 4204,
      historyApiFallback: true,
      contentBase: './',
      hot: true
    }
  }
}