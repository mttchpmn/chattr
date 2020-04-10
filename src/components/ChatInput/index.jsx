import React from "react";

import socket from "../../socket";

function ChatInput({ name }) {
  const [message, setMessage] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!message) return;

    const payload = {
      name,
      text: message,
    };
    socket.emit("chat message", payload);
    setMessage("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        padding: 5,
      }}
    >
      <form style={{ width: "100%", display: "flex" }}>
        <input
          className="nes-input"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message"
          autoComplete="off"
        />
        <button
          className={
            message === "" ? "nes-btn is-disabled" : "nes-btn is-primary"
          }
          type="submit"
          onClick={e => handleSubmit(e)}
          style={{ minWidth: 200 }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
