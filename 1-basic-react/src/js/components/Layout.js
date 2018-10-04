import React from "react";
import Header from "./Header";
import Footer from "./Footer";

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