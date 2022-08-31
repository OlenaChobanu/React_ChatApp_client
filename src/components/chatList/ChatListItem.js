import React from "react";
import Avatar from "../../shared/Avatar/Avatar";

export default class ChatListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const lastMsg = this.props.u.messages[this.props.u.messages.length - 1].msg;
    const date = this.props.u.messages[this.props.u.messages.length - 1].date;
    return (
      <li
        className={`chatlist__item ${
          this.props.u.search.searchMode && this.props.u.search.searchRes
            ? "hidden"
            : ""
        }`}
        id={this.props.u._id}
      >
        <Avatar image={this.props.u.image} isOnline={this.props.isOnline} />

        <div className="userMeta">
          <div className="user-info">
            <p className="user-name">
              {this.props.u.name} {this.props.u.lastName}
            </p>
            <p className="lastMsg-dateTime">{`${date.month} ${
              date.date
            }, ${+date.year}`}</p>
          </div>
          <p className="lastMsg">{lastMsg.slice(0, 100)}</p>
        </div>
      </li>
    );
  }
}
