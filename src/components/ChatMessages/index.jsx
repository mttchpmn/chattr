import React from "react";

function ChatMessages({ name, messages }) {
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

export default ChatMessages;
