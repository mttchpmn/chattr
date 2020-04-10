import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ChatHeader({ name, roomID }) {
  const [color, setColor] = React.useState("#aaa");
  return (
    <div className="nes-container is-rounded" style={{ margin: 10 }}>
      <h1>chattr.</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Hi {name}!</span>
        <CopyToClipboard
          text={roomID}
          onCopy={() => alert("Copied Room ID to clipboard!")}
        >
          <span
            onMouseEnter={() => setColor("#006bb3")}
            onMouseLeave={() => setColor("#aaa")}
            style={{ textAlign: "right", color: color }}
          >
            Room ID: {roomID}
          </span>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default ChatHeader;
