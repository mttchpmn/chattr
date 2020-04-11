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
      clearTimeout(this.timer);
      this.setState({ notification: `${name} is typing...` });
      this.timer = setTimeout(
        () => this.setState({ notification: null }),
        2000
      );
    });

    socket.on("new member", name => {
      clearTimeout(this.timer);
      this.setState({ notification: `${name} joined the room` });
      this.timer = setTimeout(
        () => this.setState({ notification: null }),
        2000
      );
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { notification } = this.state;

    return (
      <div style={{ textAlign: "center", fontSize: 14 }}>{notification}</div>
    );
  }
}

export default ChatNotificationBar;
