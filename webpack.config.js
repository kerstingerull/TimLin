const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildPath = './build/';
const javaScriptPath = 'JavaScript/';
const assetPath = 'Assets/';
const imagePath = assetPath + 'Images/';
const cssPath = assetPath + 'Css/';

// node_modules/.bin/webpack --display-error-details
// node_modules/.bin/webpack --watch
module.exports = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'images': path.resolve(__dirname, buildPath + imagePath)
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    entry: ['./src/JavaScript/mainVue.js', './src/Assets/Css/style.sass'],
    output: {
        filename: javaScriptPath + 'app.js',
        path: path.resolve(__dirname, buildPath)
    },
    watch: false,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                // https://github.com/webpack-contrib/file-loader
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                // loader: "file-loader?name=/Assets/Images/[name].[ext]",
                options: {
                    name: imagePath + '[name].[hash].[ext]'
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
                // geht nicht, da options nur für einzelne loader gehen
                // options: {
                //     includePaths: [
                //         path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
                //     ]
                // }
            }

        ]
    },
    plugins: [
        // https://www.npmjs.com/package/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: 'Instagram Watcher',
            // filename: 'index.html',
            template: './src/index.ejs',
            files: {
                css: [cssPath + 'style.css', path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")],
                js: [javaScriptPath + 'app.js']
            },
            hash: true
        }),
        // https://jonathanmh.com/webpack-sass-scss-compiling-separate-file/
        new ExtractTextPlugin({
            filename: cssPath + 'style.css',
            allChunks: true,
        })
    ]
};