let path = require('path'),
    fs = require('fs'),
    loaderUtils = require('loader-utils')
    themeRegex = /\{\{[\s?]*["|'|`](.*[\.[webp|png|jpe?g|gif|ico])["|'|`][\s?]*\|[\s?]*theme[\s?]*\}\}/g;

module.exports = function (content, map, meta) {
    let options = loaderUtils.getOptions(this)
    if (content.match(themeRegex)) {
        let parts;
        while ((parts = themeRegex.exec(content)) !== null) {
            let fullPath = path.join(options.from, parts[1]),
                file = fs.readFileSync(fullPath)
            this.emitFile(parts[1], file)
        }
    }

    return 'module.exports = [\n' +
        JSON.stringify(content) +
        '\n].join();'
}

