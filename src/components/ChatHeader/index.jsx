import React from "react";

function ChatHeader({ name, roomID }) {
  return (
    <div>
      <h1>chattr.</h1>
      <p>
        Hi {name}, you're connected to {roomID}
      </p>
    </div>
  );
}

export default ChatHeader;
