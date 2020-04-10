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
    <form style={{ position: "fixed", bottom: 0, width: "100%", padding: 5 }}>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
        autoComplete="off"
        style={{ width: "80%" }}
      />
      <button
        type="submit"
        onClick={e => handleSubmit(e)}
        style={{ width: "10%" }}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
