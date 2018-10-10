import React from "react";

import { Route } from "react-router";
import { HashRouter } from "react-router-dom";

import Archives from "./Archives";
import Featured from "./Featured";
import Settings from "./Settings";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default class Layout extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>

          <Route path="/" component={Nav}/>

          <div class="container">
            <div class="row">
              <div class="col-lg-12">

                {/* If we use `exact path` then component is displayed
                only at `/` route, but if we use `path` then component
                is displayed at every route that begins with `/` */}

                {/* Beware of hash sign `#` - `localhost:8080/#/archives` */}
                <Route path="/archives/:article?" component={Archives}/>
                <Route path="/settings" component={Settings}/>
                <Route exact path="/" component={Featured}/>

                <Route path="/" component={Footer}/>

              </div>
            </div>
          </div>

        </div>
      </HashRouter>
    );
  }
}