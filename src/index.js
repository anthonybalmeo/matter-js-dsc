import ReactDOM from "react-dom";
import React, { Component } from "react";
import { createWreckingBall } from "./createWreckingBall.js";
import { createProductStack } from "./createProductStack.js";

class Matter extends Component {
  componentDidMount() {
    // createProductStack();
    createWreckingBall();
  }
  render() {
    return <div className="matter-component" />;
  }
}

export default Matter;

ReactDOM.render(<Matter />, document.getElementById("root"));
