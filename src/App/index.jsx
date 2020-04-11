import React from "react";

import HomeScreen from "../components/HomeScreen";
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";
import ChatHeader from "../components/ChatHeader";
import socket from "../socket";

import "./app.css";
import ChatNoticationBar from "../components/ChatNotificationBar";

// TODO
// - Use short uuids for rooms
// - Notification when members leave
// - Input and error handling
// - Flash title when new message

class App extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      roomID: null,
      messages: [],
      name: "",
      announcement: null,
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

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleExit() {
    const { name, roomID } = this.state;

    this.setState({ roomID: null });
    socket.emit("leave", { roomID, name });
  }

  render() {
    const { roomID, name, messages, announcement } = this.state;

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
        <ChatHeader
          name={name}
          roomID={roomID}
          handleExit={() => this.handleExit()}
        />
        <ChatNoticationBar />
        <ChatMessages
          name={name}
          messages={messages}
          announcement={announcement}
        />
        <ChatInput name={name} roomID={roomID} />
      </div>
    );
  }
}

export default App;
