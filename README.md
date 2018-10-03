# React Applications
Remarks are based on the video course:
https://www.youtube.com/watch?v=MhkGQAoc7bc
Git Repository is here:
https://github.com/learncodeacademy/react-js-tutorials

## 1. Basic React

### Initial Project Structure
Checkout branch "basic-react-initial-structure" to get initial project structure.
Now let's take a look to the `<body>` section of our template page located at `./dist/index.html`.
```html
<body>
  <div id="app"></div>
  <script src="./client.min.js"></script>
</body>
```
The `<div` element was marked here with `ìd="app"`. It is the container for our application.
`<script>` includes built version of our code and it is located in `./dist/client.min.js`.

Our main source file `./src/client.js` is minimal react application:
```js
import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component {
  render() {
    return (
      <h1>It works!</h1>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);
```
It includes `React` and `ReactDOM`- which is our rendering engine. 
It has a class called `Layout` that based on `React.Component` class. \
Anyway, everything in `react` is a component. The same way as everything in `html` page is an element.
For very basic `react` component it is enough to have only a `render()` method. \
Main part of the `render()` method is the `.jsx` expression enclosed into parenthesis, that is actually `html` that will be converted to "javascript created html elements".
So our `<h1>` element will be something like:
```js
var h1 = document.createElement("h1");
h1.innerHTML = "It works";
```
To make work with `jsx` easier you will need a `jsx` plugin for your text editor.

So now we have a component that has enclosed HTML, what's next? We need to show on the page somehow. That's where `ReactDOM` comes into play. Remember that we have defined the `div` element with `id="app"`? We will get this element and render our component inside of it.
```js
const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);
```

### Installing
Incredible chapter. Call `npm install` from folder `1-basic-react`.

### Building an Application with Webpack
So right we have our js source files in `src/js` and our html page in `dist` folder. Our page requires `client.min.js`, so it has to be created and moved to `dist` folder. This all is already defined in webpack configuration file. Just read the comments inside.
There are a couple of options how you can run `webpack`
1. So if `webpack` was installed globally with `npm install -g webpack webpack-cli` then to build our application we should run (from `1-basic-react`):
```
webpack --config webpack.config.js --progress 
```
2. Also we can run the locally installed instance.
If you run `npm install` from folder `1-basic-react-app` then you will get a local instance of `webpack`. Then you can also run (from `1-basic-react`):
```
node_modules/.bin/webpack --config webpack.config.js --progress 
```
3. It's the same as the 2nd one, but it easier to use, `npm` supplies us with a tool called `npx` which can access and run all locally installed plugins, so you can run:
```
npx webpack --config webpack.config.js --progress 
```
4. You may noticed that `npx webpack --config webpack.config.js --progress ` is a bit to much to write each time, so i packed it into `scripts` section of our `package.json` with the name `build`. So you can call it through `npm` now like this:
```
npm run build
```
If you have no idea which way to choose - options 2-4 are cleaner because they allow you to install and use several different version of `webpack` locally.

By the way, no matter which method you choose `webpack` will not end the process after the compilation because `watch` option is set to `true` in configuration. This means that `webpack` will be monitoring all `entries` (check configuration) and if entry itself or one of its dependencies changes then `webpack` will recompile all bundles (output files). So if want to stop the process you should do it manually (`Ctrl+C`).


### Live Reloading
Basically you have 2 simple ways to hold a project to be live reloaded. \
* First one is to call `webpack` through CLI with `--watch` option or set it to `true` in your configuration file (that is already made).
* Or use `webpack-dev-server`. It should be already installed locally and i already prepared once script in `package.json`, so you can call `npm run serve`. I configured a lot of options for `webpack-dev-server` in configuration file, so you go through it or you can check documentation here:
  * [Webpack Usage Guide](https://webpack.js.org/guides/development/)
  * [Webpack Configuration Guide](https://webpack.js.org/configuration/)


### ESLint
If you are not using Atom or VS Code - skip this part.
In order to check your `jsx` code you may:
1. Install `eslint` extension to your editor. 
2. Install `eslint-plugin-react` globally `npm install eslint-plugin-react -g` to support `react` syntax.
3. Create configuration file `.eslintrc.json`. (This one is already attached to the project).

[ESLint Official Page](https://eslint.org/)


```js

```
