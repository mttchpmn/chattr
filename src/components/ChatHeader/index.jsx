import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { randomColor } from "../colors";

function ChatHeader({ name, roomID, handleExit }) {
  const [color, setColor] = React.useState("#505050");

  return (
    <section
      className="nes-container is-rounded"
      style={{
        margin: 10,
        backgroundColor: randomColor,
      }}
    >
      <button
        className="nes-btn is-error"
        style={{ position: "absolute", top: -8, right: -8 }}
        onClick={() => handleExit()}
      >
        X
      </button>
      <div>
        <h1>chattr.</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Hi {name}!</span>
          <CopyToClipboard
            text={roomID}
            onCopy={() => alert("Copied Room ID to clipboard!")}
          >
            <span style={{ textAlign: "right", color: color }}>
              Room ID: {roomID}&#x1f4cb;
            </span>
          </CopyToClipboard>
        </div>
      </div>
    </section>
  );
}

export default ChatHeader;
