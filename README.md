# React Applications
Remarks are based on the video course:
https://www.youtube.com/watch?v=MhkGQAoc7bc
Git Repository is here:
https://github.com/learncodeacademy/react-js-tutorials

# 1. Basic React

## 1.1 Initial Project Setup
### Minimal React
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


## 1.2 Back to React Basics
### One Element Rule
Everything in react is a component and __component returns only one DOM element__.
So if we change `./src/client.js` so:
```js
class Layout extends React.Component {
  render() {
    return (
      <h1>It works!</h1>
      <h1>It works!</h1>
    );
  }
}
```
It will not work!
>  Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?

So if we wrp them into one `<div>` then it will work.
```js
class Layout extends React.Component {
  render() {
    return (
      <div>
        <h1>It works!</h1>
        <h1>It works!</h1>
      </div>
    );
  }
}
```

### Injecting Dynamic Information
If we create a constant and set it to some value then we can inject it to our header.
```js
class Layout extends React.Component {
  render() {
    const name = "Will";
    return (
      <h1>It is {name}!</h1>
    );
  }
}
```
So everything that is inside of our `jsx` expression and surrounded with curly braces is a plain javascript. So it is also possible to write the functions over there...
```js
<h1>It is {3 + 2}!</h1>
<h1>It is {3 + name}!</h1>
<h1>It is {
    (function() {
    console.log("some message");
    return 'amazing!'; })() 
}</h1>
```
... but it is not recommended. Because these parts are used as templates.
So you could implement some logic outside of your return statement inside of the `render` method, but it would be much cleaner if you would write additional logic methods outside of `render` method.
```js
class Layout extends React.Component {
  getProperty() {
    return 'property';
  }
  render() {
    return (
      <h1>It is {this.getProperty()}!</h1>
    );
  }
}
```
We can also use a `constructor` function to set a property.
```js
class Layout extends React.Component {
  constructor() {
    super();
    this.name = 'Will';
  }
  render() {
    return (
      <h1>It is {this.name}!</h1>
    );
  }
}
```

## 1.3 More Components
Now we have the `Layout` component defined in `client.js`, let's move this definition in its own file.
In `src/js` we will create a folder called `components` and inside of it we make a file called `layout.js`. Also let's create a `Header` component in `Header.js` file in the same folder and we will include our `Header` in our `Layout` component.
```js
// Header.js
import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header>Header</header>
    );
  }
}

// Layout.js
import React from "react";
import Header from "./Header";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}
```
Good, now our `client.js` should simply import our `Layout` and render it to DOM.
```js
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);
```
Now we need a `Footer` component.
```js
import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>Footer</footer>
    );
  }
}
```
We will add it to our `Layout` under the `Header`. Also we will create a `Title` component for a `Header`, since it will be used as subcomponent, we will create a subfolder called `Header` and create our subcomponent over there.
```js
// src/js/component/Header/Title.js
import React from "react";

export default class Title extends React.Component {
  render() {
    return (
      <h1>Welcome</h1>
    );
  }
}
```
Then we will import our title in our header.
```js
import React from "react";
import Title from "./Header/Title";

export default class Header extends React.Component {
  render() {
    return (
      <Title/>
    );
  }
}
```
One more nice thing about this structure and `React`.
If you look at the endpoint html structure you will see that our `Title` now located on the same level with the `footer`. It does not matter, that we have the intermediate `Header` level, we will not get any kind of `<div>` element as a provider to subelement.

## 1.4 Passing Data Around
There are basically 3 ways data gets handled in react:
* State
* Props
* Context

### State
So state is available through `this.state`, which by default is `null`. So we can set our state, for example, in `Layout`. 
The only place you want to set `state` is a `constructor` method. Otherwise, everywhere else you have to use `this.setState()`.
```js
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {step: "Loading..."};
  }

  render() {
    return (
      <div>
        <p>{this.state.step}</p>
        <Header/>
        <Footer/>
      </div>
    );
  }
}
```
So what is really great is that if `state` changes the component will render again only the part of the DOM that has changed in some way. If DOM elements has not changed than DOM remains untouched.
Also react will replace only changed part in the most efficient way.

That is nice because DOM is the slowest part of webpage. So if do not need to reload the DOM completely then you can save some time.

So let's change our state after 3 seconds. As it was said before, if you changing the state outside of `constructor`, you have to use `this.setState()`.
```js
  render() {
    setTimeout(() => {
      this.setState({step: "Loaded"});
    }, 3000);
    return (
      <div>
        <p>{this.state.step}</p>
        <Header/>
        <Footer/>
      </div>
    );
  }
```

To check exactly what has changed on your page you should open `devtools` in chrome, go to console, hit `Esc` button and choose `Rendering` from dot menu / tabs. Then activate option "paint flashing".
This way if you reload the page you will see that after the timeout only the paragraph with `state.step` has changed.

The header can have its own state as well.

_Mentality behind `state`_: \
`State` is only get used if a component has an internal value that only affects the component and doesn't affect any of the rest of the app, if there is something that affects layout and affect nothing else then state maybe appropriate. 
Aside from that you want to use `props`.

### Props
So now we delete our state...
```js
export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Footer/>
      </div>
    );
  }
}
```
...and we will inject the `prop` into our `Header`.
So let's create a constant called `title` and we inject this property to `Header` element like to an usual DOM element.
```js
export default class Layout extends React.Component {
  render() {
    const title = "Welcome";
    return (
      <div>
        <Header title={title}/>
        <Footer/>
      </div>
    );
  }
}
```
So now if we go to our `Header.js`, we can access `this.props`, let put a `console.log(this.props)` to see what we get here.
```js
export default class Header extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Title/>
    );
  }
}
```
> {title: "Welcome"}

We can create there a multiple `props`. We can set some value directly right there, you know, any expression you wish, but in curly braces `{}`.
What is interesting in it, if we duplicate our header and set different `title` value to it then we will create 2 different element based on the same component.
```js
export default class Layout extends React.Component {
  render() {
    const title = "Welcome";
    return (
      <div>
        <Header title={"Hello"}/>
        <Header title={title}/>
        <Footer/>
      </div>
    );
  }
}
```
Additionally we will inject out `title` even deeper.
Let's inject `prop` in our `Title` component, and call it `mainTitle` to avoid confusion. You can also use the same name `title` if you wish.
```js
export default class Header extends React.Component {
  render() {
    return (
      <Title mainTitle={this.props.title}/>
    );
  }
}
```
Finally we will edit our `Title` template to show the injected `prop`.
```js
export default class Title extends React.Component {
  render() {
    return (
      <h1>{this.props.mainTitle}</h1>
    );
  }
}
```

### Combining State and Props
So by default our `state.title` will be `"Welcome"`. And we will inject our state into `Header` component. Also after 3 seconds we will change our `state` to `"How are you?"`.
```js
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {title: "Welcome"};
  }
  render() {
    setTimeout(()=>{
      this.setState({title:"How are you?"})
    }, 3000);

    return (
      <div>
        <Header title={"Hello"}/>
        <Header title={this.state.title}/>
        <Footer/>
      </div>
    );
  }
}
```
So, back to concept, no matter how many things have changed it is only matter, what is there in the DOM has to be changed.
So now we changed the `state` of `Layout`, `prop` of `Header` and `prop` of `Title`, but only one `<h1>` element of one of the `Header`s is updated in the DOM.

## 1.5 Binding Events, User Inputs
Let's create a user input in `Header` component and we will update the `Title` everytime when the `input` changes.
First we will create a method `changeTitle` and we will pass it in `Header` component binding to `Layout`, that is important, because otherwise this method will be trying to modify the state of the `Header` component.

  
