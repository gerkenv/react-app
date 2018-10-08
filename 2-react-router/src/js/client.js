import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Bootstrap from "./vendor/bootstrap-without-jquery";

import Layout from "./pages/Layout";

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);