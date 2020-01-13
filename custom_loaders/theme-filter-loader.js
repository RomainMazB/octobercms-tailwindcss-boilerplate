let path = require('path'),
    fs = require('fs'),
    themeRegex = /\{\{[\s?]*["|'|`](.*[\.[png|jpe?g|gif|ico])["|'|`][\s?]*\|[\s?]*theme[\s?]*\}\}/g;

module.exports = function (content, map, meta) {
    let filterTags = content.match(themeRegex)
    if (filterTags) {
        output = true
        filterTags = [...new Set(filterTags)]
        filterTags.map(filterTag => {
            let parts = themeRegex.exec(filterTag),
                fromFullPath = path.join(this.rootContext, 'src/', parts[1]),
                file = fs.readFileSync(fromFullPath)
                fromRelativePath = path.relative(this.context, fromFullPath)
            this.emitFile(parts[1], file)
        })
    }

    return 'module.exports = [\n' +
        JSON.stringify(content) +
        '\n].join();'
}
