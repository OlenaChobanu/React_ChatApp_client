import React from "react";
import "./chatList.css";
import ChatListHeader from "./chatListHeader/chatListHeader";
import ChatListItem from "./ChatListItem";

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="aside-cont">
          <ChatListHeader
            my_img={this.props.my_img}
            value={this.props.value}
            onSearchChange={this.props.onSearchChange}
          />
          <div className="main__chatlist" onClick={this.props.onListClick}>
            <div className="chatlist__heading">
              <h2>Chats</h2>
            </div>

            <ul className={"chatlist__items"}>
              {this.props.users.map((u) => {
                return (
                  <ChatListItem
                    u={u}
                    key={u._id}
                    isOnline={u.isOnline ? "active" : ""}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
