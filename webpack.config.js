const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    entry: './src/JavaScript/mainVue.js',
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
                    name: imagePath + '[name].[ext]?[hash]'
                }
            },
            {
                // https://medium.com/@mahesh.ks/using-sass-scss-in-vue-js-2-d472af0facf9
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: [
                            path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
                        ]
                    }
                }],

            }
        ]
    },
    // https://www.npmjs.com/package/html-webpack-plugin
    plugins: [new HtmlWebpackPlugin({
        title: 'Instagram Watcher',
        // filename: 'index.html',
        template: './src/index.ejs',
        files: {
            // css: [cssPath + 'style.css', cssPath + 'style.sass'],    // kann wegbleiben weil das CSS irgendwo anders ist
            js: [javaScriptPath + 'app.js']
        },
        hash: true
    })]
};
// npm install file-loader --save-dev