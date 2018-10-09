# React v.16 Applications
Remarks are based on the video course:
https://www.youtube.com/watch?v=MhkGQAoc7bc
Git Repository is here:
https://github.com/learncodeacademy/react-js-tutorials

# 1 Basic React
## 1.0 Setup
Switch to the branch `1-basic-react-setup`.
Working directory for this part is `1-basic-react`.
Call `npm install` from working directory.

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

### Building an Application with Webpack v.4
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
### Passing the Method Below
Let's create a user input in `Header` component and we will update the `Title` everytime when the `input` changes.
First we will create a method `changeTitle` and we will pass it in `Header` component __binding to `Layout`__, that is important, because otherwise injected method will be trying to modify the state of the `Header` component.
```js
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title: title});
  }

  render() {
    return (
      <div>
        <Header changeTitle={this.changeTitle.bind(this)}
                title={this.state.title}/>
        <Footer/>
      </div>
    );
  }
}
```
And now inside of `Header` component we will `setTimeout` to change the title. So this will trigger rerendering of `Layout` component.
```js
export default class Header extends React.Component {
  render() {
    setTimeout(() => {
      this.props.changeTitle("New Title");
    }, 3000);

    return (
      <div>
        <Title mainTitle={this.props.title} />
        <input />
      </div>
    );
  }
}
```
So the page has to render a new title after the timeout.
__Warning__
In this case we have created an infinitive loop of rerendering with 3 seconds interval. Because each time we are changing title - we are changing the state and when we changing the state is causes rerendering what creates an asynchronous change of a title in 3 seconds.
So never ever trigger the change of the state `render` function directly. You have to provide additional logic to stop the infinitive loop.

### Binding Event of `<Input>`
Now let's make use of our input. We shall connect the standard event `onChange` with our componenet's listener `onInputChange` where we will trigger the change of `Layout` state.
```js
export default class Header extends React.Component {
  onInputChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    return (
      <div>
        <Title mainTitle={this.props.title} />
        <input onChange={this.onInputChange.bind(this)}/>
      </div>
    );
  }
}
```
Now the only thing we need to fix is initial value of `<input>`.
```js
  render() {
    return (
      <div>
        <Title mainTitle={this.props.title} />
        <input value={this.props.title}
               onChange={this.onInputChange.bind(this)}/>
      </div>
    );
  }
```

# 2 React-Router v.4 & Single Page Applications
## 2.0 Setup
Switch to the branch `2-react-router-setup`.
Working directory for this part is `2-react-router`.
Call `npm install` from working directory.

## 2.1 Implementing Router
We will replace a standard rendering to the DOM with routing, so we open `client.js` and replace
```js
ReactDOM.render(<Layout/>, app);
```
with following code
```js
ReactDOM.render(
  <HashRouter>
    <Route path="/" component={Layout}></Route>
  </HashRouter>,
  app
);
```
* https://reacttraining.com/react-router/web/api/HashRouter

Now let's create a couple of pages, we will start from `./src/js/pages/Featured.js`:
```js
import React from "react";

export default class Featured extends React.Component {
  render() {
    return (
      <h1>Featured</h1>
    );
  }
}
```
Now basing on the same pattern we will create `Archive` and `Settings`. And then import hem all in `client`. We will also set our routes.
```js
import Archives from "./pages/Archives";
import Featured from "./pages/Featured";
import Settings from "./pages/Settings";

ReactDOM.render(
  <HashRouter>
    <div>
      {/* If we remove `exact` then `Layout` will be displayed
      at any route that begins with `/` */}
      <Route exact path="/" component={Layout}/>
      <Route path="/archives" component={Archives}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/featured" component={Featured}/>
    </div>
  </HashRouter>,
  app
);
```
__Note__:
We are using `HashRouter`, so to access any route you have to set `/#` between host and a route, for example `Settings` URI is `localhost:8080/#/Settings`.

### 2.1.1 Dynamic Links
If you want to set a link to route, then you could import the `Link` module and set link to `<a>` element or to a `<button>`.
```js
import { Link } from "react-router-dom";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <h1>FruitNews.net</h1>
        <Link to="/archives">archives</Link>
        <Link to="/settings">settings</Link>
        <Link to="/featured"><button>featured</button></Link>
      </div>
    );
  }
}
```
At the page it will be rendered as:
```html
<div>
  <h1>FruitNews.net</h1>
  <a href="#/archives">archives</a>
  <a href="#/settings">settings</a>
  <a href="#/featured">
    <button>featured</button>
  </a>
</div>
```
Also you could use bootstrap buttons or `this.props.history.push()`:
```jsx
export default class Layout extends React.Component {
  navigate() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>FruitNews.net</h1>
        <Link to="/archives" class="btn btn-default">archives</Link>
        <Link to="/settings" class="btn btn-success">settings</Link>
        <button onClick={this.navigate.bind(this)}>Featured</button>
      </div>
    );
  }
}
```
__Note__:
`this.props.history.push()` pushes new URL to browser history stack, but if you'll use `this.props.history.replace()` then you overwritting the last URL.

## 2.2 Route Parameters
Let's imagine you don't want to open the whole archive, but specific article,
then you could replace
```js
<Route path="/archives" component={Archives}/>
```
with following route definition
```js
<Route path="/archives/:article" component={Archives}/>
```
In this case the URL `localhost:8080/#/archives` will not lead to `Archives`
component anymore and you need to use more some specific URL to match the pattern
`localhost:8080/#/archives/anything`.
So now let's print out our `props` to console to see what we have there:
```js
export default class Archives extends React.Component {
  render() {
    console.log(this.props);
    return (
      <h1>Archives</h1>
    );
  }
}
```
So if you go to `http://localhost:8080/#/archives/some-text` then you will see
in the console, that `this.props.match.params.article` is equal to `some-text`.
So let's show it on our page:
```js
export default class Archives extends React.Component {
  render() {
    console.log(this.props);
    return (
      <h1>Archives / {this.props.match.params.article}</h1>
    );
  }
}
```
Of course we an also make it cleaner:
```js
export default class Archives extends React.Component {
  render() {
    const { article } = this.props.match.params;
    return (
      <h1>Archives / {article}</h1>
    );
  }
}
```

### 2.2.1 Query Variables in Routes
To be able to parse usual query string or query parameters we should install and import `query-string` package.
Go to working directory and call
```
npm install -s query-string
```
Then update the code in `Archives.js`
```js
export default class Archives extends React.Component {
  getAllQueryParams() {
    const queryParams = queryString.parse(this.props.location.search);

    let params = "";
    for (let param in queryParams) {
      params += " / " + param + " is " + queryParams[param];
    }
    return params;
  }

  render() {
    console.log(this.props);
    const { article } = this.props.match.params;
    let params = this.getAllQueryParams();
    return (
      <div>
        <h1>Archives / {article}</h1>
        <h2>{params}</h2>
      </div>
    );
  }
}
```
Now if we go to `http://localhost:8080/#/archives/news-5?date=01.01.2016&time=23:59`.
Then our query parameters will be parsed and displayed in `<h2>`.

### 2.2.2 Optional Route Parameters
If we change
```js
<Route path="/archives/:article" component={Archives}/>
```
to form with an optional parameter
```js
<Route path="/archives/:article?" component={Archives}/>
```
Then we could use our query strings at following URI:
* `http://localhost:8080/#/archives/some-text?date=01.01.2016&time=23:59`
* `http://localhost:8080/#/archives?date=01.01.2016&time=23:59`


### 2.2.3 Setting Class to A Current Link
Actually name of chapter has to be something like "Setting a class definition to a link if its target route is set".

Let's change the code a bit for our `Layout` component
```js
import React from "react";
import { NavLink } from "react-router-dom";

export default class Layout extends React.Component {
  navigate() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>FruitNews.net</h1>
        <NavLink to="/archives" activeClassName="Active">archives</NavLink>
        <NavLink to="/settings">settings</NavLink>
        <button onClick={this.navigate.bind(this)}>Featured</button>
      </div>
    );
  }
}
```
Now if we go to `http://localhost:8080/#/archives`, then link will get the `class="Active"`,
and if we go to another page, like `http://localhost:8080/#/settings` where this link is available then you will see that this class is gone.
* https://stackoverflow.com/questions/43146460/reactjs-unknown-prop-activeclassname-on-a-tag-remove-this-prop-from-the-e

### 2.2.4 Determine if a Current Route is Active
In previous version of `react-router`, v3 and less, there was a possibility to check if a route of current component is now active. It was made with
```js
  render() {
    console.log(this.props.history.isActive(""));
    return (
      //...
```
From version 4 it is a bit different - read this thread:
* https://github.com/ReactTraining/react-router/issues/4793

There is a possibility to hang a callback to a `NavLink`, so when the route becomes active, the state can be changed in the component.
* https://reacttraining.com/react-router/web/api/NavLink/isactive-func

