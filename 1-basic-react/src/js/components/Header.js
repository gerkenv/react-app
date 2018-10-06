import React from "react";
import Title from "./Header/Title";

export default class Header extends React.Component {
  render() {
    this.props.changeTitle("newTitle");
    return (
      <Title mainTitle={this.props.title} />
    );
  }
}