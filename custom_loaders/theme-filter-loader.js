let path = require('path'),
    fs = require('fs'),
    // Regex to match all the |theme filter except the theme.js file which is already handled by webpack
    themeRegex = /\{\{[\s?]*["|'|`](.*)["|'|`][\s?]*\|[\s?]*theme[\s?]*\}\}/g;

module.exports = function (content) {
    // This files must be protected since it's already handle by webpack
    let protected_files = ['assets/javascript/theme.js', 'assets/css/theme.css'];
    // Find any |theme filter use
    while((parts = themeRegex.exec(content)) !== null) {
        if (protected_files.includes(parts[1]))
            continue;

        let fromFullPath = path.join(this.rootContext, 'src/', parts[1]),
            file = fs.readFileSync(fromFullPath)
        this.emitFile(parts[1], file)
    }

    return 'module.exports = [\n' +
        JSON.stringify(content) +
        '\n].join();'
}
