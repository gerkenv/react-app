import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute } from "react-router";
import { HashRouter } from "react-router-dom";

import Bootstrap from "./vendor/bootstrap-without-jquery";

import Layout from "./pages/Layout";

const app = document.getElementById('app');

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={Layout}></Route>
  </HashRouter>,
  app
);

// ReactDOM.render(<Layout/>, app);