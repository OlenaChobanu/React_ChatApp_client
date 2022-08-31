import React from "react";
import "./button.css";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        className={`${this.props.className} ${
          this.props.disabled ? "disabled" : ""
        }`}
        type={this.props.type}
        id={this.props.id}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      ></button>
    );
  }
}
