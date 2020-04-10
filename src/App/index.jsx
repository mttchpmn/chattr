import React from "react";

import HomeScreen from "../components/HomeScreen";
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";
import ChatHeader from "../components/ChatHeader";
import socket from "../socket";

import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomID: null,
      messages: [],
      name: "",
    };
  }

  componentDidMount() {
    socket.on("chat message", msg => {
      const { messages } = this.state;
      this.setState({ messages: [...messages, msg] });
    });

    socket.on("create", roomID => {
      this.setState({ roomID });
    });

    socket.on("join", roomID => {
      this.setState({ roomID });
    });
  }

  render() {
    const { roomID, name, messages } = this.state;

    if (!roomID)
      return <HomeScreen handleSubmit={name => this.setState({ name })} />;

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatHeader name={name} roomID={roomID} />
        <ChatMessages name={name} messages={messages} />
        <ChatInput name={name} />
      </div>
    );
  }
}

export default App;
