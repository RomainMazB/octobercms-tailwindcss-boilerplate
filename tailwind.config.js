module.exports = {
    theme: {
      textIndent: { // defaults to {}
        '1': '0.25rem',
        '2': '0.5rem',
      },
      textShadow: { // defaults to {}
        'default': '0 2px 5px rgba(229,244,177, 0.5)',
        'lg': '0 2px 10px rgba(255, 255, 255, 0.5)',
      },
      textStyles: theme => ({ // defaults to {}
        heading: {
          output: false, // this means there won't be a "heading" component in the CSS, but it can be extended
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.tight'),
        },
        h1: {
          extends: 'heading', // this means all the styles in "heading" will be copied here; "extends" can also be an array to extend multiple text styles
          fontSize: theme('fontSize.5xl'),
          '@screen sm': {
            fontSize: theme('fontSize.6xl'),
          },
        },
        h2: {
          extends: 'heading',
          fontSize: theme('fontSize.4xl'),
          '@screen sm': {
            fontSize: theme('fontSize.5xl'),
          },
        },
        h3: {
          extends: 'heading',
          fontSize: theme('fontSize.4xl'),
        },
        h4: {
          extends: 'heading',
          fontSize: theme('fontSize.3xl'),
        },
        h5: {
          extends: 'heading',
          fontSize: theme('fontSize.2xl'),
        },
        h6: {
          extends: 'heading',
          fontSize: theme('fontSize.xl'),
        },
        link: {
          fontWeight: theme('fontWeight.bold'),
          color: theme('colors.blue.400'),
          '&:hover': {
            color: theme('colors.blue.600'),
            textDecoration: 'underline',
          },
        },
        richText: {
          fontWeight: theme('fontWeight.normal'),
          fontSize: theme('fontSize.base'),
          lineHeight: theme('lineHeight.relaxed'),
          '> * + *': {
            marginTop: '1em',
          },
          'h1': {
            extends: 'h1',
          },
          'h2': {
            extends: 'h2',
          },
          'h3': {
            extends: 'h3',
          },
          'h4': {
            extends: 'h4',
          },
          'h5': {
            extends: 'h5',
          },
          'h6': {
            extends: 'h6',
          },
          'ul': {
            listStyleType: 'disc',
          },
          'ol': {
            listStyleType: 'decimal',
          },
          'a': {
            extends: 'link',
          },
          'b, strong': {
            fontWeight: theme('fontWeight.bold'),
          },
          'i, em': {
            fontStyle: 'italic',
          },
        },
      }),
    },
    variants: { // all the following default to ['responsive']
      textIndent: ['responsive'],
      textShadow: ['responsive'],
      ellipsis: ['responsive'],
      hyphens: ['responsive'],
      textUnset: ['responsive'],
      caps: ['responsive'],
      nums: ['responsive'],
      ligatures: ['responsive'],
    },
    plugins: [
      require('tailwindcss-typography')({
        // all these options default to the values specified here
        ellipsis: true,         // whether to generate ellipsis utilities
        hyphens: true,          // whether to generate hyphenation utilities
        textUnset: true,        // whether to generate utilities to unset text properties
        caps: true,             // whether to generate utilities to use alternate glyphs for capital letters
        nums: true,             // whether to generate utilities to use alternate glyphs for numbers, fractions, and ordinal markers
        ligatures: true,        // whether to generate ligature utilities
        componentPrefix: 'c-',  // the prefix to use for text style classes
      }),
    ],
  }