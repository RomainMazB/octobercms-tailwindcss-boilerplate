TailwindCSS Boilerplate Theme
=============================

### This is not a theme, it's much more!

TailwindCSS Boilerplate theme **is not a theme**, it's a boilerplate to create some awesome themes with all the developper's tools included: TailwindCSS, Webpack, BrowserSync already configured to build with the OctoberCMS's directory structure, PostCSS with some the majors plugins, PurgeCSS, and all of this managed with NPM.

**Have fun!**

### TailwindCSS/Webpack/PostCSS ready
<details><summary>Display content</summary>
TailwindCSS, Webpack and PostCSS is already installed and pre-configured to work together. Each configuration file is pre-built but customizable.

This boilerplate comes with webpack and fully customised `webpack.config.js` file for OctoberCMS to manage all your assets: css, javascript, images, fonts and also all your template files: **Webpack will walk through all your directories and subdirectories** present in your theme folder to compile the .htm, .html and .txt files to catch all the assets dependencies you may have added in them!

PostCSS is the prepocessor of this boilerplate with the most used plugins. Feel free to add the plugins you want into the `postcss.config.js`
</details>

### PurgeCSS & Minification
<details><summary>Display content</summary>
To ensure the optimization of your final theme, all unused CSS will be removed with PurgeCSS, and all the JS and CSS files will be minified.
Be aware that to not slow down the watch process, the purge and minification happen only on the `npm run build` process
</details>

### Auto-injection of CSS/JS
<details><summary>Display content</summary>
**All the files presents in the layouts directory** will **receive the CSS/JS** due to the Webpack auto-injection and a special rule for this directory.
</details>

### Auto-clean of previous build
<details><summary>Display content</summary>
This boilerplate uses `clean-webpack-plugin` to ensure you don't have any useless files in your theme folder. Your files is cleaned on every modifications webpack makes.
</details>

How to use
==========

**The theme is not prebuilt, when installed, you may see some errors: it's a normal behavior, I wanted to you to understand how to build before actually use and customize it.
You have to build it before see it.**

### Create a new Blank theme
From the backend, create a new blank theme from the settings panel, activate it and remember the folder name of it, you will need it for the next step.

### .env file needed
First of all: if it's not already the case, be sure to run `php artisan october:env`, it will create an .env file at the root of your project folder.

In this `.env` file, add the name of the blank theme you've just created:
```dotenv
ACTIVE_THEME_FOLDER=blank_theme_folder
```
Webpack will also use `APP_URL` inside of it to serve the local server with BrowserSync and to correctly sets the paths of the assets. Be sure that it's correctly defined:
```dotenv
APP_URL=http://dummy.test
```

### NPM
Again, this theme is not a theme, it's a toolkit, based on NPM. To use it, be sure to have [node](https://github.com/nodejs/node) and [npm](https://github.com/npm/cli) installed on your machine.

Then, follow this quick steps:

1. Launch a terminal from the `romainmazb-tailwindcss-boilerplate` directory
2. Run `npm install` from the theme's root directory to install dependencies.
3. Run `npm run watch` to run the development server with hot reload.
4. The best and my favorite part: ***Have fun with coding!***

Be aware of the fact that every time you create a new file, it can't be detected by the devServer, you need to reload `npm run watch` command.

### Folder structure, where to put your code.
Due to the pre-built configuration, you need to ensure all the modifications you make stay in the `src` directory. All directories, subdirectories and files will be cleaned and recreated by webpack on the root of the the theme'sroot folder. Think of the `src` directory as your **`root`** directory

The default directories and files structure of this boilerplate are:
```
/
/assets
    /images
        theme-preview.png
/custom_filter
    theme-filter-loader.js
/node_modules/ (after npm install)
/src/
    /assets/
        /css/
            entry.css (loads TailwindCSS and inserts your custom css at the right place)
            themes.css (your actual custom css)
        /fonts/
        /images/
            october.png
        /javascript/
            app.js (your custom javascript)
    /content/
    /layouts/
        /default.htm
    /pages/
        404.htm
        error.htm
        home.htm
    /partials/
        /site/
            footer.htm
            header.htm
    index.js
/package.json
/postcss.config.js
/README.md
/tailwindcss.config.js
/theme.yaml
/version.yaml
/webpack.config.js
```

After webpack build, all the relevant files in the src will be parsed and placed on the same structure from the root folder.

Roadmap
==========
* [ ] Cleanup and split files to be more maintainable
* [ ] Add rules to PurgeCSS to handle OctoberCMS Froala Editor content
