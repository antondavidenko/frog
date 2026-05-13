var path = require('path')
var webpack = require('webpack')

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true,
    CANVAS_RENDERER: true
})

module.exports = {
    entry: {
        app: [path.resolve(__dirname, 'src/app.ts')],
        vendor: ['phaser']
    },
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'index.js'
    },
    watch: true,
    plugins: [
        definePlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'/* chunkName= */,
            filename: 'libs.js'/* filename= */
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            // 'phaser': phaser,
            phaser: path.resolve(__dirname, 'node_modules/phaser/dist/phaser.js')
        }
    }
}