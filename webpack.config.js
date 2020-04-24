/* Required packages */
require('dotenv').config({ path: __dirname + '/./../../.env' })

let path = require('path'),
    browserSyncPlugin = require('browser-sync-webpack-plugin'),
    miniCSSExtractPlugin = require('mini-css-extract-plugin'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    purgecssPlugin = require('purgecss-webpack-plugin'),
    uglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    fs = require('fs'),
    glob = require('glob'),

    /* Defining paths */
    active_theme_folder = process.env.ACTIVE_THEME_FOLDER,
    from = path.resolve('./src/'),
    to = path.resolve('../' + active_theme_folder),
    publicPath = path.join('themes', active_theme_folder)

    /* Plugins to register */
    HTMLPlugins = []

async function config()
{

    await filewalker(from, ['htm', 'html', 'txt'], addHTMLWebpackObject);

    return {
        mode: 'development',
        entry: {
            javascript: './index.js'
        },
        output: {
            filename: 'assets/javascript/theme.js',
            path: to,
            publicPath: publicPath
        },
        resolveLoader: {
            modules: ['node_modules', 'custom_loaders']
        },
        devServer: {
            contentBase: path.join(to),
            compress: true,
            port: 9000,
            hot: true
        },
        plugins: [
            new browserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: process.env.APP_URL + ':80'
            }),
            new miniCSSExtractPlugin({
                filename: 'assets/css/theme.css',
                chunkFilename: '[id]-[hash].css',
            }),
            new purgecssPlugin({
                paths: () => glob.sync(from + '/**/*', { nodir: true }),
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["!version.yaml", "!assets/images/theme-preview.png", "!theme.yaml", "!.gitignore", "!.git/", "!LICENSE", "!README.md"],
            })
        ].concat(HTMLPlugins),
    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                }),
            new optimizeCSSAssetsPlugin({
                test: /\.css$/
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: miniCSSExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                    },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                    },
                        'postcss-loader'
                    ],
            },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
            },
                {
                    test: /\.(png|jpe?g|gif|svg|ico)$/i,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[ext]',
                        esModule: false
                    }
            },
                {
                    test: /\.(html?|txt)$/i,
                    loader: 'theme-filter-loader'
            }
            ],
        },
    }
}

module.exports = config();


/**
 * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
 *
 * @base from  http://stackoverflow.com/a/5827895/4241030
 * @param {String} dir
 * @param {String} ext
 * @param {Function} done
 */
function filewalker(dir, ext, done)
{
    let dirs_to_ignore = [process.cwd()+'/node_modules', process.cwd()+'/custom_loaders', process.cwd()+'/.git'];
    return new Promise(resolve => {
            let results = [];
        fs.readdir(dir, function (err, list) {
            if (err) {
                return done(err);
            }

            let pending = list.length;

            if (!pending) {
                return done(null, results);
            }

            list.forEach(async function (file) {
                if (! dirs_to_ignore.includes(dir)) {
                    file = path.resolve(dir, file);
                    fs.stat(file, async function (err, stat) {
                        // If directory, execute a recursive call
                        if (stat && stat.isDirectory()) {
                            await filewalker(file, ext, async function (err, res) {
                                results = results.concat(res);
                                if (!--pending) {
                                    await done(null, results);
                                    resolve();
                                }
                            });
                        } else {
                            // If extension matches
                            if (ext.includes(path.extname(file).substring(1))) {
                                results.push({
                                    output_filename: path.relative(from, file),
                                    template: file
                                });
                            }
                            // If last file to check
                            if (!--pending) {
                                await done(null, results);
                                resolve();
                            }
                        }
                    });
                }
            });
        });
    });
}

/**
 * Create new HTML Webpack Objects from an array of input/output path
 *
 * @param {String} err
 * @param {Object} data
 */
function addHTMLWebpackObject(err, data)
{
    return new Promise((resolve, reject) => {
        if (err) {
            reject(err);
        }

        data.forEach((HTMLElement, key, data) => {
            HTMLPlugins.push(
                new HTMLWebpackPlugin({
                    filename: to + "/" + HTMLElement.output_filename,
                    template: HTMLElement.template,
                    inject: false,
                    minify: true,
                    open: true
                })
            )
        if (Object.is(data.length - 1, key)) {
            resolve();
        }
        });
    });
}
