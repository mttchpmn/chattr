import React from "react";

function ChatMessages({ name, messages, announcement }) {
  const messagesEndRef = React.useRef(null);

  // Automatically scroll to bottom when new message comes in
  React.useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ownMessage = msg => (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <section className="message -right">
        <div className="nes-balloon from-right">{msg.text}</div>
        <p style={{ textAlign: "right", marginBottom: 0 }}>Me</p>
      </section>
    </div>
  );

  const otherMessage = msg => (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <section className="message -left">
        <div className="nes-balloon from-left">{msg.text}</div>
        <p style={{ marginBottom: 0 }}>{msg.name}</p>
      </section>
    </div>
  );

  return (
    <div
      className="nes-container is-rounded"
      style={{
        backgroundColor: "#bbb",
        height: "100%",
        overflowY: "scroll",
        flexGrow: 1,
        paddingTop: 5,
        margin: 10,
      }}
    >
      <div style={{ textAlign: "center", minHeight: 24 }}>
        {announcement ? announcement : ""}
      </div>

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
