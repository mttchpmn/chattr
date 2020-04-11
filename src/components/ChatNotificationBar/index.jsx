import React, { Component } from "react";
import socket from "../../socket";

class ChatNotificationBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: null,
    };
  }

  componentDidMount() {
    socket.on("typing", name => {
      this.setNotification(`${name} is typing...`);
    });

    socket.on("joined", name => {
      this.setNotification(`${name} joined the room`);
    });

    socket.on("left", name => {
      this.setNotification(`${name} left the room`);
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setNotification(notification) {
    clearTimeout(this.timer);
    this.setState({ notification });
    this.timer = setTimeout(() => this.setState({ notification: null }), 2000);
  }

  render() {
    const { notification } = this.state;

    return (
      <div style={{ textAlign: "center", fontSize: 14 }}>{notification}</div>
    );
  }
}

export default ChatNotificationBar;
