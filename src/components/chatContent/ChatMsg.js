import React from "react";
import Avatar from "../../shared/Avatar/Avatar";

export default class ChatMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`chat__item ${this.props.message.type}`}>
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.message.msg}</div>
          <div className={`chat__meta ${this.props.message.type}`}>
            <span>
              {this.props.message.date.monthNum}/{this.props.message.date.date}/
              {this.props.message.date.year % 100}, {this.props.message.time}
            </span>
          </div>
        </div>

        <Avatar
          isOnline={
            this.props.message.type ? this.props.user.isOnline : "active"
          }
          image={
            this.props.message.type === "other"
              ? this.props.user.image
              : "../../../img/user.png"
          }
        />
      </div>
    );
  }
}
