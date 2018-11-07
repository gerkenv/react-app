import React from "react";
import Title from "./Header/Title";

export default class Header extends React.Component {
  onInputChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }
  
  render() {
    return (
      <div>
        <Title mainTitle={this.props.title} />
        <input value={this.props.title} 
               onChange={this.onInputChange.bind(this)}/>
      </div>
    );
  }
}