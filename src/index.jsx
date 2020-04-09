import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: "",
      messages: [],
      name: "",
    };
  }

  componentDidMount() {
    socket.on("chat message", msg => {
      const { messages } = this.state;
      console.log(`${msg.name} : ${msg.text}`);
      this.setState({ messages: [...messages, msg] });
      console.log("this.state :", this.state);
    });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { msg, name } = this.state;

    const payload = {
      name,
      text: msg,
    };

    e.preventDefault();
    socket.emit("chat message", payload);
    this.setState({ msg: "" });
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
    const { msg, name } = this.state;

    return (
      <div>
        <h1>chattr.</h1>
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
