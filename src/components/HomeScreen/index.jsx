import React from "react";

import socket from "../../socket";
import { randomColor } from "../colors";

function HomeScreen({ handleSubmit }) {
  const [name, setName] = React.useState("");
  const [joinID, setJoinID] = React.useState("");

  return (
    <div
      style={{ height: "100vh", display: "grid", backgroundColor: randomColor }}
    >
      <div
        className="nes-container with-title is-rounded is-centered"
        style={{
          width: "50%",
          margin: "auto",
          maxWidth: "600px",
          backgroundColor: "#fff",
        }}
      >
        <p className="title">chattr</p>

        <h2>Create or join room</h2>

        <form>
          <div className="nes-field">
            <label htmlFor="name">Your name</label>
            <input
              className="nes-input"
              type="text"
              autoComplete="off"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="nes-field">
            <label htmlFor="join-id">Room ID</label>
            <input
              className="nes-input"
              type="text"
              id="join-id"
              autoComplete="off"
              placeholder="Leave blank for new room"
              value={joinID}
              onChange={e => setJoinID(e.target.value)}
            />
          </div>

          <div>
            {joinID === "" ? (
              <button
                type="submit"
                style={{ marginTop: 30 }}
                disabled={name === ""}
                className={
                  name === "" ? "nes-btn is-disabled" : "nes-btn is-primary"
                }
                onClick={e => {
                  e.preventDefault();
                  // CREATE A NEW ROOM
                  socket.emit("create");
                  handleSubmit(name);
                }}
              >
                Create Room
              </button>
            ) : (
              <button
                type="submit"
                style={{ marginTop: 30 }}
                disabled={name === ""}
                className={
                  name === "" ? "nes-btn is-disabled" : "nes-btn is-primary"
                }
                onClick={e => {
                  e.preventDefault();
                  // JOIN EXISTING ROOM WITH ID: joinID
                  socket.emit("join", { joinID, name });
                  handleSubmit(name);
                }}
              >
                Join Room
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeScreen;
