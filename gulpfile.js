const path = require('path');
const gulp = require('gulp');
const {src, dest, parallel, series} = gulp;
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if')
const merge = require('merge-stream');
const named = require('vinyl-named');
const webpack = require('webpack-stream');

let {name, version} = require('./package.json');

function getWebpackConfig(isESM, isDev){
    const webPackConfig =  {
        mode: isDev ? "development" : "production", // can be changed to production to produce minified bundle

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
            filename: `${name}.bundle.${!isDev ? 'min.' : ''}${isESM ? 'esm.' : ''}js`,
            path: path.resolve(__dirname, "dist/"),
            library: {
                type: "module",
            },    
        }
    }

    if(isESM)
        webPackConfig.experiments = {outputModule: true} 
    else
        webPackConfig.output = Object.assign({}, webPackConfig.output, {globalObject: 'this', library: name, libraryTarget: "umd", umdNamedDefine: true,});

    if (isDev)
        webPackConfig.devtool = 'eval-source-map';

    return webPackConfig;
}

function exportDefault(isDev){
    return function exportDefault(){
        const tsProject = ts.createProject('tsconfig.json', {
            target: "es5",
            module: "commonjs",
            declaration: true,
            declarationMap: true,
            emitDeclarationOnly: false,
            isolatedModules: false
        });

        const stream =  src('./src/**/*.ts')
            .pipe(gulpIf(isDev, sourcemaps.init()))
            .pipe(tsProject())

        return merge([
            stream.dts.pipe(dest("lib")),
            stream.js.pipe(gulpIf(!isDev, uglify())).pipe(gulpIf(isDev, sourcemaps.write())).pipe(dest("lib"))
        ])
    }

}

function exportBundles(isEsm, isDev){
    const entryFile = "src/index.ts"
    return src(entryFile)
        .pipe(named())
        .pipe(webpack(getWebpackConfig(isEsm, isDev)))
        .pipe(dest(`./dist${isEsm ? '/esm' : ""}`));
}

function exportESMDist(){
    return exportBundles(true, false);
}

function exportJSDist(){
    return exportBundles(false, false);
}

exports.dev = exportDefault(true)
exports.prod = parallel(exportDefault(false) , exportESMDist, exportJSDist);