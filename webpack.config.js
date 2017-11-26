const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildPath = './build/';
const srcPath = './src/';
const javaScriptPath = 'JavaScript/';
const cssPath = 'Sass/';
const scssPath = 'Scss/';
const assetPath = 'Assets/';
const imagePath = assetPath + 'Images/';
const fontPath = assetPath + 'Fonts/';

const extractSASS = new ExtractTextPlugin({
    filename: cssPath + 'app.css',
});
const extractSCSS = new ExtractTextPlugin({
    filename: cssPath + 'font-awesome.css',
});

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
        srcPath + cssPath + 'app.sass',
        srcPath + fontPath + scssPath + 'font-awesome.scss'
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
                test: /Images\/.*\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: imagePath + '[name].[hash].[ext]'
                }
            },
            {
                test: /Fonts\/.*\.(otf|eot|svg|ttf|woff?2)$/i,
                loader: 'file-loader',
                options: {
                    name: fontPath + '[name].[ext]',
                    // outputPath: '../',
                    publicPath: '/'
                }
            },
            {
                test: /\.(sass)$/,
                use: extractSASS.extract([{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }]),
            },
            {
                test: /\.(scss)$/,
                use: extractSCSS.extract([{
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
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
            title: 'TimLin',
            template: './src/index.ejs',
            files: {
                css: [
                    fontPath + 'font-awesome.css',
                    cssPath + 'app.css'
                ],
                js: [javaScriptPath + 'app.js']
            },
            hash: true
        }),
        // https://jonathanmh.com/webpack-sass-scss-compiling-separate-file/
        extractSASS,
        extractSCSS
    ]
};
// TODO check other bootstrap implementation
// https://getbootstrap.com/docs/4.0/getting-started/webpack/
/**
 *     plugins: [
 ...
 new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery",
            'Popper': 'popper.js'
        }),
 */




//  --save-dev