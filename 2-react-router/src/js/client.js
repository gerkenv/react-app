import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute } from "react-router";
import { HashRouter } from "react-router-dom";

import Bootstrap from "./vendor/bootstrap-without-jquery";

import Layout from "./pages/Layout";

import Archives from "./pages/Archives";
import Featured from "./pages/Featured";
import Settings from "./pages/Settings";

const app = document.getElementById('app');

ReactDOM.render(
  <HashRouter>
    <div>
      {/* If we use `exact path` then component is displayed
      only at `/` route, but if we use `path` then component
      is displayed at every route that begins with `/` */}
      <Route path="/" component={Layout}/>
      {/* Beware of hash sign `#` - `localhost:8080/#/archives` */}
      <Route path="/archives/:article?" component={Archives}/>
      <Route path="/settings" component={Settings}/>
      <Route exact path="/" component={Featured}/>
    </div>
  </HashRouter>,
  app
);

// ReactDOM.render(<Layout/>, app);