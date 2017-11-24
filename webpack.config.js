const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildPath = './build/';
const srcPath = './src/';
const javaScriptPath = 'JavaScript/';
const cssPath = 'Sass/';
const assetPath = 'Assets/';
const imagePath = assetPath + 'Images/';

// node_modules/.bin/webpack --display-error-details
// node_modules/.bin/webpack --watch
module.exports = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'images': path.resolve(__dirname, buildPath + imagePath),
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    entry: [
        srcPath + javaScriptPath + 'mainVue.js',
        srcPath + cssPath + 'app.sass'
    ],
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
                test: /\.(scss|sass|css)$/,
                use: ExtractTextPlugin.extract([{
                    loader: 'css-loader', // translates CSS into CommonJS modules
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader', // compiles SASS to CSS
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }]),
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
                css: [cssPath + 'app.css'],
                js: [javaScriptPath + 'app.js']
            },
            hash: true
        }),
        // https://jonathanmh.com/webpack-sass-scss-compiling-separate-file/
        new ExtractTextPlugin({
            filename: cssPath + 'app.css',
            allChunks: true,
        })
    ]
};