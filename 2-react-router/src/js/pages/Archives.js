import React from "react";
const queryString = require('query-string');

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