//const path = require('path');
const webpack = require('webpack')
// var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
var FlowtypePlugin = require('flow-webpack-plugin');

module.exports = {
    entry: {
        index: "./scripts/index.js",
        admin: "./scripts/admin.js"
    },
    output: {
        filename: './public/javascripts/[name].js',
        path: __dirname,
        libraryTarget: "umd",
        library: "[name]"

    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            enforce: "pre",
            use: ["remove-flow-types-loader"],
            include: __dirname//path.join(__dirname, "src")
        }]
    },

    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             loader: 'flow-remove-types',
    //             enforce: 'pre',
    //             exclude: /node_modules/
    //         },
    //     ]
    // },

    plugins: [
        /* Use the ProvidePlugin constructor to inject jquery implicit globals */
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.quot": "jquery"
        }),
        // new FlowtypePlugin({
        //     failOnError: true,
        //     // flowPath: __dirname
        //     flowArgs: ["--from=./../.."]
        //
        // })
        // new FlowBabelWebpackPlugin(),
    ],


watch: true
}

