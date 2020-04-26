TailwindCSS Boilerplate Theme
=============================

### This is not a theme, it's much more!

TailwindCSS Boilerplate theme **is not a theme**, it's a boilerplate to create some awesome themes with all the developper's tools included: TailwindCSS, Webpack, BrowserSync already configured to build with the OctoberCMS's directory structure, PostCSS with some the majors plugins, PurgeCSS, and all of this managed with NPM.

**Have fun!**

### TailwindCSS/Webpack/PostCSS ready
<details><summary>Display content</summary>
TailwindCSS, Webpack and PostCSS is already installed and pre-configured to work together.
Each configuration file is pre-built but customizable directly from your theme directory.

This boilerplate comes with webpack and fully customised `webpack.config.js` file for OctoberCMS to manage all your assets: css, javascript, images, fonts and also all your template files: **Webpack will walk through all your directories and subdirectories** presents in your theme folder to compile the .htm, .html and .txt files to catch all the assets dependencies you may have added in them!

PostCSS is the prepocessor of this boilerplate with the most used plugins. Feel free to add the plugins you want into the `postcss.config.js`
</details>

### PurgeCSS & Minification
<details><summary>Display content</summary>
To ensure the optimization of your final theme: the `npm run build` process will remove all unused CSS with PurgeCSS, and all the JS and CSS files will be minified.
Be aware that to not slow down the watch process, the purge and minification happen only on the `npm run build` process
</details>

### Auto-clean of previous build
<details><summary>Display content</summary>
This boilerplate uses `clean-webpack-plugin` to ensure you don't have any useless files in your theme folder. Your files is cleaned only on the build process not to slow down the hot reload module.
</details>

How to use
==========

**The theme is not prebuilt, when installed. You may see some errors: it's a normal behavior, I wanted from you to understand how to build before actually use and customize it.
You have to build it before see it.**

#### .env file needed
First of all: if it's not already the case, be sure to run `php artisan october:env`, it will create an .env file at the root of your project folder.

Webpack will use `APP_URL` inside of it to serve the local server with BrowserSync and to correctly sets the paths of the assets. Be sure that it's correctly defined:
```dotenv
APP_URL=http://dummy.test
```

#### Configure the new Blank theme
The Boilerplate comes with a blank theme in the `blank-src` folder, and use the `boilerplate.yaml` configuration file to create the final theme directory.
Copy the `blank-src` directory to the October's `themes` one.

In the `blank-src`: you can see a `theme.yaml`: this it the one for the *Source theme*, and the `new-theme.yaml` is the one for... the new theme, obviously.
It will be renamed on watch/build process, the two files are needed to differenciate them from the backend.

*As long as you modify the theme name in the boilerplate.yaml, you are free to name the new theme as you want.
Eg: in `boilerplate.yaml` you can put the `themeName` to `awesome-theme` and create a `awesome-theme-src` folder which will be the `src` directory for your new theme.
The boilerplate will generate the `awesome-theme` in the October's `themes` folder.*

#### NPM
Again, this theme is not a theme, it's a toolkit, based on NPM. To use it, be sure to have [node](https://github.com/nodejs/node) and [npm](https://github.com/npm/cli) installed on your machine.

Then, follow this quick steps:

1. Launch a terminal from the `romainmazb-tailwindcss-boilerplate` directory
2. Run `npm install` to install **the boilerplate dependencies**.
3. Then go to the `blank-src` directory and launch again `npm install`, this will install **your theme dependencies**, for now just the ones required by October, PostCSS and TailwindCSS.
4. Go back to the `romainmazb-tailwindcss-boilerplate` directory and run npm run watch` to run the development server with hot reload.
5. Since a new blank theme were created, go to the October backend settings and activate your new theme.
5. The best and my favorite part: ***Have fun with coding!***

Be aware of the fact that every time you create a new file, it can't be detected by the devServer, you need to reload `npm run watch` command.

Roadmap
==========
* [x] Cleanup and split files to be more maintainable
* [x] Add rules to PurgeCSS to handle Froala Editor content
* [ ] Waiting for suggestions -> *In progress...*
