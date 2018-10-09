import React from "react";
import queryString from "query-string";

import Article from "../components/Article";

export default class Archives extends React.Component {
  getAllQueryParams() {
    const queryParams = queryString.parse(this.props.location.search);

    let params = "";
    for (let param in queryParams) {
      if (params) { params += " / "; }
      params += param + " is " + queryParams[param];
    }
    return params;
  }

  getArticles() {
    const Articles = [
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
      "Fake Article",
      "Partial Article",
      "American Article",
      "Mexican Article",
    ].map((title, i) => <Article key={i} title={title}/> );

    return Articles;
  }

  render() {
    const { article } = this.props.match.params;
    const params = this.getAllQueryParams();
    const articles = this.getArticles();
    return (
      <div>
        <h1>Archives</h1>
        <h2>{article}</h2>
        <h3>{params}</h3>
        <div class="row">{articles}</div>
      </div>
    );
  }
}