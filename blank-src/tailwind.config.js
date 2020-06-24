let glob = require('glob'),
    path = require('path')

module.exports = {
    theme: {
        extend: {
        }
    },
    variants: {},
    plugins: [],
    purge: glob.sync(path.join(__dirname, '**/*.htm')),
  }
