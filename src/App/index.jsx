import React from "react";

import HomeScreen from "../components/HomeScreen";
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";
import ChatHeader from "../components/ChatHeader";
import socket from "../socket";

import "./app.css";
import ChatNoticationBar from "../components/ChatNotificationBar";

// TODO
// - Input and error handling
// - Add flag to make room public on creation, name it, and show in list to join

class App extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = {
      roomID: null,
      messages: [],
      name: "",
      announcement: null,
      unread: 0,
      online: 1,
    };
  }

  componentDidMount() {
    socket.on("chat message", msg => {
      const { messages, unread } = this.state;
      this.setState({ messages: [...messages, msg], unread: unread + 1 });
      if (document.hidden) document.title = `chattr (${unread})`;
    });

    socket.on("create", roomID => {
      this.setState({ roomID });
    });

    socket.on("join", ({ roomID, messages, online }) => {
      this.setState({ roomID, messages, online });
    });

    socket.on("room update", room => this.setState({ online: room.online }));
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleExit() {
    const { name, roomID } = this.state;
    this.setState({ roomID: null, messages: [] });

    socket.emit("leave", { roomID, name });
  }

  render() {
    const { roomID, name, messages, announcement, online } = this.state;

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
          online={online}
          handleExit={() => this.handleExit()}
        />
        <ChatNoticationBar />
        <ChatMessages
          name={name}
          messages={messages}
          announcement={announcement}
        />
        <ChatInput
          name={name}
          roomID={roomID}
          handleFocus={() => {
            this.setState({ unread: 0 });
            document.title = "chattr";
          }}
        />
      </div>
    );
  }
}

export default App;
