const Encore = require('@symfony/webpack-encore')
const path = require('path')


Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

    .addEntry('app', './front/index.tsx')
    .enableReactPreset()
    .enableTypeScriptLoader()

const config = {
    ...Encore.getWebpackConfig(),
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss', '.png', '.gif', '.jpeg', '.jpg', '.svg', '.css'],
        modules: ['node_modules', 'front']
    },
}


module.exports = config
