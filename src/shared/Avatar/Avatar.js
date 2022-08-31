import React from "react";

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={this.props.image} alt="#" width="40" height="40" />
        </div>
        <span
          className={`isOnline ${this.props.isOnline ? "active" : ""}`}
        ></span>
      </div>
    );
  }
}
