import React from "react";
import ChatList from "../chatList/ChatList";
import ChatMainContent from "../chatContent/ChatMainContent";
import axios from "axios";

export default class ChatBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChatUsers: [],
      currentUser: null,
      usersUrl: "https://chobanu-react-chat-app.herokuapp.com/api/allChatUsers",
      responseUrl: "https://api.chucknorris.io/jokes/random",
      disabled: true,
      sendMsgValue: "",
      value: "",
    };

    this.onListClick = this.onListClick.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSendChange = this.onSendChange.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
    this.onBackToListClick = this.onBackToListClick.bind(this);
    this.validateInputMsg = this.validateInputMsg.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.notifyUser = this.notifyUser.bind(this);
  }

  componentDidMount() {
    axios
      .get(this.state.usersUrl)
      .then((r) => {
        r = r.data;
        this.setState({
          ...this.state,
          allChatUsers: r.sort((a, b) =>
            a.lastMsgTime < b.lastMsgTime ? 1 : -1
          ),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <>
        <ChatList
          my_img={this.props.my_img}
          value={this.state.value}
          users={this.state.allChatUsers}
          onListClick={this.onListClick}
          onSearchChange={this.onSearchChange}
        />
        <ChatMainContent
          my_img={this.props.my_img}
          currentUser={this.state.currentUser}
          onSendClick={this.onSendClick}
          onSendChange={this.onSendChange}
          onBackToListClick={this.onBackToListClick}
          disabled={this.state.disabled}
          value={this.state.sendMsgValue}
        />
      </>
    );
  }

  getCurrentDate() {
    let current = new Date();
    let year = current.getFullYear();
    let month = new Date().toLocaleString("en", {
      month: "short",
    });
    let monthNum = current.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let date = current.getDate();
    if (date < 10) date = "0" + date;
    return { date: date, monthNum: monthNum, month: month, year: year };
  }

  getCurrentTime() {
    let today = new Date();
    let hours = today.getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = today.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let ampm = hours < "12" ? "AM" : "PM";
    return `${hours}:${minutes} ${ampm}`;
  }

  onSearchChange(e) {
    this.setState({
      ...this.state,
      currentUser: null,
      allChatUsers: this.state.allChatUsers.map((u) =>
        (u.name + u.lastName)
          .toLowerCase()
          .search(e.target.value.toLowerCase()) !== -1
          ? { ...u, search: { searchMode: true, searchRes: false } }
          : { ...u, search: { searchMode: true, searchRes: true } }
      ),
      value: e.target.value,
    });
  }

  onListClick(e) {
    document.querySelector('.aside-cont').classList.add('mobile-hidden');
    document.querySelector('.main__chatcontent').classList.contains('mobile-hidden') && document.querySelector('.main__chatcontent').classList.remove('mobile-hidden');;
    document.querySelector('.back-to-list-btn-cont').classList.remove('mobile-hidden');
    const currentUserId = e.target.closest(".chatlist__item").id;
    console.log('currentUserId',currentUserId)
    this.setState({
      ...this.state,
      currentUser: this.state.allChatUsers.find((u) => u._id === currentUserId),
      allChatUsers: this.state.allChatUsers.map((u) => u.search.searchMode === false ? u : {...u, search:  { searchMode: false, searchRes: false } } ),
      //  {...u, search: { searchMode: false, searchRes: false } }
      
      value: "",
      disabled: true,
    });
  }

  onBackToListClick(e) {
    console.log('CLICK!!')
    document.querySelector('.aside-cont').classList.toggle('mobile-hidden');
    document.querySelector('.back-to-list-btn-cont').classList.toggle('mobile-hidden');
    document.querySelector('.main__chatcontent').classList.toggle('mobile-hidden');

    // document.querySelector('.main__chatcontent').classList.toggle('hidden');
  }

  onSendChange(e) {
    this.validateInputMsg(e);
  }

  validateInputMsg(e) {
    if (!e.target.value.trim()) {
      this.setState({
        ...this.state,
        disabled: true,
      });
    } else {
      this.setState({
        ...this.state,
        disabled: false,
        sendMsgValue: e.target.value,
      });
    }
  }

  onSendClick(e) {
    axios
      .put(this.state.usersUrl, {
        ...this.state.currentUser,
        lastMsgTime: Date.now(),
        messages: [
          ...this.state.currentUser.messages,
          {
            key: Date.now(),
            lastMsgTime: Date.now(),
            type: "",
            msg: this.state.sendMsgValue,
            time: this.getCurrentTime(),
            date: this.getCurrentDate(),
          },
        ],
      })
      .then((r) => {
        r = r.data;

        this.setState({
          ...this.state,
          currentUser: r,
          allChatUsers: this.state.allChatUsers
            .map((u) => (u._id === r._id ? r : u))
            .sort((a, b) => (a.lastMsgTime < b.lastMsgTime ? 1 : -1)),
        });

        setTimeout(
          this.getResponse,
          Math.round(Math.random() * (16000 - 10000) + 10000),
          r
        );
      })
      .catch((e) => {
        console.log(e);
      });

    e.target.closest("div").children[0].value = "";
  }

  getResponse(user) {
    return axios.get(this.state.responseUrl).then((r) => {
      r = r.data;

      axios
        .put(this.state.usersUrl, {
          ...user,
          isOnline: true,
          lastMsgTime: Date.now(),
          messages: [
            ...user.messages,
            {
              key: Date.now(),
              lastMsgTime: Date.now(),
              type: "other",
              msg: r.value,
              time: this.getCurrentTime(),
              date: this.getCurrentDate(),
            },
          ],
        })
        .then((r) => {
          r = r.data;

          if (this.state.currentUser._id === r._id) {
            this.setState({
              ...this.state,
              currentUser: r,
              allChatUsers: this.state.allChatUsers.map((u) =>
                u._id === r._id ? r : u
              ),
            });
          } else {
            this.setState({
              ...this.state,
              allChatUsers: this.state.allChatUsers.map((u) =>
                u._id === r._id ? r : u
              ),
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });

      this.notifyUser(user.name, r.value);
    });
  }

  notifyUser(userName, msg) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification(`${userName}: ${msg}`);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          new Notification(`${userName}: ${msg}`);
        }
      });
    }
  }
}
