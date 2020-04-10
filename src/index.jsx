import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomID: null,
      joinID: "",
      msg: "",
      messages: [],
      name: "",
    };
  }

  componentDidMount() {
    socket.on("chat message", msg => {
      const { messages } = this.state;
      // console.log(`${msg.name} : ${msg.text}`);
      this.setState({ messages: [...messages, msg] });
    });

    socket.on("create", roomID => {
      console.log("CREATE EMITTED FROM SERVER : " + roomID);
      this.setState({ roomID });
    });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { msg, name } = this.state;
    if (msg === "") return;

    const payload = {
      name,
      text: msg,
    };
    socket.emit("chat message", payload);
    this.setState({ msg: "" });
  }

  renderRoomSelect() {
    const { joinID } = this.state;

    return (
      <div>
        <h2>Create or join room</h2>

        <div>
          <button
            onClick={() => {
              socket.emit("create");
            }}
          >
            Create
          </button>
        </div>

        <div>
          <input
            name="joinID"
            value={joinID}
            autoComplete="off"
            onChange={e => this.handleTextChange(e)}
          />
          <button
            onClick={() => {
              socket.emit("join", joinID);
              this.setState({ roomID: joinID });
            }}
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  renderChat() {
    const { name, messages } = this.state;

    return (
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <span style={{ color: name === msg.name ? "blue" : "red" }}>
              {msg.name}: $
            </span>{" "}
            {msg.text}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { roomID, msg, name } = this.state;

    if (!roomID) return this.renderRoomSelect();

    return (
      <div>
        <h1>chattr.</h1>
        <p>Connected to {roomID}</p>
        <div>
          Enter your name:
          <input
            name="name"
            value={name}
            onChange={e => this.handleTextChange(e)}
          />
        </div>
        {this.renderChat()}
        <form
          style={{ position: "fixed", bottom: 0, width: "100%", padding: 5 }}
        >
          <input
            name="msg"
            value={msg}
            onChange={e => this.handleTextChange(e)}
            placeholder="Type a message"
            autoComplete="off"
            style={{ width: "80%" }}
          />
          <button
            type="submit"
            onClick={e => this.handleSubmit(e)}
            style={{ width: "10%" }}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
