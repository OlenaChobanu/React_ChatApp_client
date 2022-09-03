import React from "react";
import "./chatListHeader.css";
import Input from "../../../shared/Input/input";
import Avatar from "../../../shared/Avatar/Avatar";

export default class ChatListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="chatListHeader">
        <div className="user-cont">
          <Avatar isOnline="true" image={this.props.my_img} />
        </div>
        <div className="search-cont">
          <Input
            value={this.props.value}
            placeholder="Search or start new chat"
            className="search-inp"
            onChange={this.props.onSearchChange}
          />
          <img src="../../../img/search-icon.png" alt="#"></img>
        </div>
      </div>
    );
  }
}
