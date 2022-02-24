const path = require('path');
const gulp = require('gulp');
const {src, dest, parallel, series} = gulp;
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if')
// const concat = require('gulp-concat');
const merge = require('merge-stream');

const named = require('vinyl-named');

const webpack = require('webpack-stream');

const {argParser} = require('@glass-project/dsu-utils/src/TestRunner');

const glassPrefix = "@glass-project/"
let {name, version} = require('./package.json');

if (name.indexOf(glassPrefix) !== -1)
    name = name.substr(glassPrefix.length).replaceAll("-", "_");

const STAGES = {
    BUILD: "build",
    DEPLOY: "deploy"
}

const MODES = {
    DEVELOPMENT: "development",
    PRODUCTION: "production"
}

const defaultOptions = {
    mode: MODES.DEVELOPMENT,
    stage: STAGES.BUILD,
    name: name
}

const config = argParser(defaultOptions, process.argv)

function isDev(){
    return config.mode === MODES.DEVELOPMENT;
}

function isProd(){
    return config.mode === MODES.PRODUCTION;
}

function isBuild(){
    return config.stage === STAGES.BUILD;
}

function isDeploy(){
    return config.stage === STAGES.DEPLOY;
}

function getWebpackConfig(isESM){
    const webPackConfig =  {
        mode: config.mode, // can be changed to production to produce minified bundle

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.json'
                        }
                    }],
                    include:[
                        path.resolve(__dirname, "src")
                    ],
                    exclude: /node_modules/,
                }
            ]
        },

        resolve: {
            extensions: ['.ts', '.js']
        },

        output: {
            filename: `${config.name}.bundle.${isProd() ? 'min.' : ''}${isESM ? 'esm.' : ''}js`,
            path: path.resolve(__dirname, "dist/"),
            library: config.name,
            libraryTarget: 'umd',
            umdNamedDefine: true
        }
    }

    if (!isESM)
        webPackConfig.output.globalObject = 'this';
    if (isDev())
        webPackConfig.devtool = 'eval-source-map';

    return webPackConfig;
}

function exportDefault(){
    const tsProject = ts.createProject('tsconfig.json', {
        target: "es5",
        module: "commonjs",
        declaration: true,
        declarationMap: true,
        emitDeclarationOnly: false,
        isolatedModules: false
    });

    const stream =  src('./src/**/*.ts')
        .pipe(gulpIf(isDev(), sourcemaps.init()))
        .pipe(tsProject())

    return merge([
        stream.dts.pipe(dest("lib")),
        stream.js.pipe(gulpIf(isProd(), uglify())).pipe(gulpIf(isDev(), sourcemaps.write())).pipe(dest("lib"))
    ])
}

function exportBundles(isEsm){
    const entryFile = "src/index.ts"
    return src(entryFile)
        .pipe(named())
        .pipe(webpack(getWebpackConfig(isEsm)))
        .pipe(dest(`./dist${isEsm ? '/esm' : ""}`));
}

function exportESMDist(){
    return exportBundles(true);
}

function exportJSDist(){
    return exportBundles(false);
}

function controlFlow(){
    if (isDeploy())
        return parallel(exportDefault , exportESMDist, exportJSDist);
    if (isBuild())
        return series(exportDefault);
}

exports.default = controlFlow()