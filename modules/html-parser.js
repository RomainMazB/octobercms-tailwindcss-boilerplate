let HTMLWebpackPlugin = require('html-webpack-plugin'),
    fs = require('fs'),
    path = require('path')

/**
 * Explores recursively a directory and returns all the file paths and folder paths in the callback.
 *
 * @base from  http://stackoverflow.com/a/5827895/4241030
 * @param {String} rootDir
 * @param {String} to
 * @param {String} dir
 * @param {string[]} ext
 * @param {Function} done
 * @return {Promise}
 */
function htmlParser(rootDir, to,  ext, done = addHTMLWebpackObject, dir = rootDir)
{
    let results = [],
        // dirs_to_ignore = [path.join(rootDir, 'node_modules'), path.join(rootDir, '.git')]
        dirs_to_ignore = [path.join(rootDir, 'node_modules'), path.join(rootDir, '.git')]

    return new Promise((resolve, reject) => {
        fs.readdir(dir, function (err, list) {
            if (err) {
                reject(err);
            }

            let pending = list.length;

            if (!pending) {
                return done(null, results, to);
            }

            list.forEach(async function (file) {
                if (dirs_to_ignore.includes(dir)) {
                    // If last file to check
                    if (!--pending) {
                        resolve(await done(null, results, to));
                    }
                }
                else {
                    file = path.resolve(dir, file);
                    fs.stat(file, async function (err, stat) {
                        // If directory, execute a recursive call
                        if (stat && stat.isDirectory()) {
                            await htmlParser(rootDir, to, ext, async function (err, res) {
                                results = results.concat(res);
                                if (!--pending) {
                                    resolve(await done(null, results, to));
                                }
                            }, file);
                        } else {
                            // If extension matches
                            if (ext.includes(path.extname(file).substring(1))) {
                                results.push({
                                    output_filename: path.relative(rootDir, file),
                                    template: file
                                });
                            }
                            // If last file to check
                            if (!--pending) {
                                resolve(await done(null, results, to));
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
 * @param {String} to
 * @return {Promise}
 */
function addHTMLWebpackObject(err, data = null, to = null)
{
    let results = [];
    return new Promise((resolve, reject) => {
        if (err) {
            reject(err);
        }

        data.forEach((HTMLElement, key, data) => {
            results.push(
                new HTMLWebpackPlugin({
                    filename: to + "/" + HTMLElement.output_filename,
                    template: HTMLElement.template,
                    inject: false,
                    minify: true,
                    open: true
                })
            )
            if (Object.is(data.length - 1, key)) {
                resolve(results);
            }
        });
    });
}

module.exports = htmlParser;
