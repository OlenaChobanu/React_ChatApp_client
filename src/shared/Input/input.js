import React from "react";
import "./input.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <input
        value={this.props.value}
        type="text"
        className={this.props.className}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
      />
    );
  }
}
