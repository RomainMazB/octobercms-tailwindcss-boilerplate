let loaderUtils = require('loader-utils'),
    path = require('path'),
    rootPath = path.resolve(__dirname, '../src'),
    themeRegex = /\{\{[\s?]*["|'|`](.*)["|'|`][\s?]*\|[\s?]*theme[\s?]*\}\}/g;
module.exports = function (content) {

    var themeFilterRequest;
    while((themeFilterRequest = themeRegex.exec(content)) !== null) {
        let relativePath = path.relative('assets', themeFilterRequest[1])
        this.emitFile(relativePath, themeFilterRequest[1])
    }

    return 'module.exports = [\n' +
        JSON.stringify(content) +
        '\n].join();'
};
