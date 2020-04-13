import React from "react";

import socket from "../../socket";

function ChatInput({ name, roomID, handleFocus }) {
  const [message, setMessage] = React.useState("");
  const mobile = window.innerWidth < 500;

  const handleSubmit = e => {
    e.preventDefault();
    if (!message) return;

    const payload = {
      roomID,
      name,
      text: message,
    };
    socket.emit("chat message", payload);
    setMessage("");
  };

  return (
    <div
      style={{
        width: "100%",
        padding: 5,
      }}
    >
      <form
        style={{
          width: "100%",
          display: "flex",
          // flexDirection: mobile ? "column" : "row",
        }}
      >
        <input
          className="nes-input"
          value={message}
          onFocus={() => handleFocus()}
          onChange={e => {
            setMessage(e.target.value);
            socket.emit("typing", { name, roomID });
          }}
          placeholder="Type a message"
          autoComplete="off"
        />
        <button
          className={
            message === "" ? "nes-btn is-disabled" : "nes-btn is-primary"
          }
          type="submit"
          onClick={e => handleSubmit(e)}
          style={{
            minWidth: mobile ? 60 : 200,
            marginLeft: 10,
          }}
        >
          {mobile ? ">" : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
