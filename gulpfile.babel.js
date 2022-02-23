const path = require('path');

const gulp = require('gulp');
const {src, dest, parallel, series} = gulp;
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

const named = require('vinyl-named');

const webpack = require('webpack-stream');

const tsOptions = {
    "emitDeclarationOnly": true,
    "sourceMap": false,
    "declarationMap": false
};

function exportModules() {
    const tsProject = ts.createProject('tsconfig.json', Object.assign({}, tsOptions, {module: "umd"}));
    return src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel({
            presets: [['@babel/preset-env', {
                targets: {"esmodules": true}
            }]]
        }))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.esm.js' }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/esm/'));
}

function exportDefault() {
    const tsProject = ts.createProject('tsconfig.json', tsOptions);
    return src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/'));
}

function exportModulesBundles(){
    const entryFile = "src/index.ts"

    return src(entryFile)
        .pipe(named())
        .pipe(webpack({
            mode: 'development', // can be changed to production to produce minified bundle
    
            devtool: 'eval-source-map',

            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: [{
                            loader: 'ts-loader',
                            options: {
                                configFile: 'tsconfig.webpack.json'
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
                filename: 'index.bundle.min.esm.js',
                path: path.resolve(__dirname, "dist/build"), //output path
                library: 'logging',
                libraryTarget: 'umd',
                umdNamedDefine: true
            }
        }))
        .pipe(dest("./dist/esm"));
}

function exportDefaultBundles() {
    const tsProject = ts.createProject('tsconfig.json', tsOptions);
    return src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel())
        .pipe(concat('index.bundle.js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write())
        .pipe(dest('dist/'));
}

exports.default = parallel(series(exportDefault, exportDefaultBundles), series( exportModules, exportModulesBundles));