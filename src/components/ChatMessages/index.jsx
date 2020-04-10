import React from "react";

function ChatMessages({ name, messages }) {
  const ownMessage = msg => (
    <section className="message -right">
      <div className="nes-balloon from-right">{msg}</div>
    </section>
  );

  const otherMessage = msg => (
    <section className="message -left">
      <div className="nes-balloon from-left">{msg}</div>
    </section>
  );

  return (
    <div
      className="nes-container"
      style={{
        height: "100%",
        flexGrow: 1,
        margin: 5,
      }}
    >
      <section className="message-list">
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.name === name ? ownMessage(msg.text) : otherMessage(msg.text)}
          </div>
        ))}
      </section>
    </div>
  );
}

export default ChatMessages;
