import React from "react";

function ChatMessages({ name, messages }) {
  const messagesEndRef = React.useRef(null);

  // Automatically scroll to bottom when new message comes in
  React.useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ownMessage = msg => (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <section className="message -right">
        <div className="nes-balloon from-right">{msg.text}</div>
        <p style={{ textAlign: "right" }}>Me</p>
      </section>
    </div>
  );

  const otherMessage = msg => (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <section className="message -left">
        <div className="nes-balloon from-left">{msg.text}</div>
        <p>{msg.name}</p>
      </section>
    </div>
  );

  return (
    <div
      className="nes-container"
      style={{
        height: "100%",
        overflowY: "scroll",
        flexGrow: 1,
        margin: 10,
      }}
    >
      <section className="message-list">
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.name === name ? ownMessage(msg) : otherMessage(msg)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </section>
    </div>
  );
}

export default ChatMessages;
