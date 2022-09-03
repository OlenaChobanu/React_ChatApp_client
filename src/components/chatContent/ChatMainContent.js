import React from "react";
import "./chatMainContent.css";
import ChatItem from "./ChatItem";
import Avatar from "../../shared/Avatar/Avatar";
import Input from "../../shared/Input/input";
import Button from "../../shared/Button/Button";

export default class ChatMainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.currentUser === null) {
      return (
        <div className="main__chatcontent initial">
          Select a chat to start messaging
        </div>
      );
    } else {
      return (
        <div className="main__chatcontent">
          <div className="content__header">
            <div className="current-chatting-user">
              <Avatar
                isOnline={this.props.currentUser.isOnline}
                image={this.props.currentUser.image}
              />

              <p>
                {this.props.currentUser.name} {this.props.currentUser.lastName}
              </p>
            </div>
          </div>

          <ChatItem
            my_img={this.props.my_img}
            currentUser={this.props.currentUser}
          />

          <div className="content__footer">
            <div className="sendNewMessage">
              <Input
                className="sendNewMessage-inp"
                placeholder="Type your message"
                onChange={this.props.onSendChange}
                value={this.props.sendMsgValue}
              />

              <Button
                className="btn-sendMsg"
                id="btn-sendMsg"
                type="submit"
                onClick={this.props.onSendClick}
                disabled={this.props.disabled}
              ></Button>
            </div>
          </div>
        </div>
      );
    }
  }
}
