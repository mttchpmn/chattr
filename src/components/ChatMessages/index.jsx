import React from "react";

function ChatMessages({ name, messages }) {
  return (
    <div
      className="nes-container"
      style={{
        height: "100%",
        flexGrow: 1,
        // backgroundColor: "red",
        margin: 5,
      }}
    >
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

export default ChatMessages;
