let glob = require('glob'),
    path = require('path')

module.exports = {
    purge: glob.sync(path.join(__dirname, '**/*.htm')),
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
    ],
}
