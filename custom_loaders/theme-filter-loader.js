let path = require('path'),
    fs = require('fs'),
    loaderUtils = require('loader-utils')
    themeRegex = /\{\{[\s?]*["|'|`](.*[\.[png|jpe?g|gif|ico])["|'|`][\s?]*\|[\s?]*theme[\s?]*\}\}/g;

module.exports = function (content, map, meta) {
    let filterTags = content.match(themeRegex)
    const options = loaderUtils.getOptions(this)
    if (filterTags) {
        output = true
        filterTags = [...new Set(filterTags)]
        filterTags.map(filterTag => {
            let parts = themeRegex.exec(filterTag),
                fullPath = path.join(options.from, parts[1]),
                file = fs.readFileSync(fullPath)
            this.emitFile(parts[1], file)
        })
    }

    return 'module.exports = [\n' +
        JSON.stringify(content) +
        '\n].join();'
}
