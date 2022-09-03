import React from "react";
import ChatMsg from "./ChatMsg";

export default class ChatItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="chat__msg">
        {this.props.currentUser.messages.map((element, i) => {
          return (
            <ChatMsg
              my_img={this.props.my_img}
              key={Date.now() + i}
              user={this.props.currentUser}
              message={element}
            />
          );
        })}
      </div>
    );
  }
}
