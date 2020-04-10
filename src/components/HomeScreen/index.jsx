import React from "react";

import socket from "../../socket";

function HomeScreen({ handleSubmit }) {
  const [name, setName] = React.useState("");
  const [joinID, setJoinID] = React.useState("");

  return (
    <div style={{ height: "100vh", display: "grid" }}>
      <div
        className="nes-container with-title is-centered"
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
              placeholder="Leave blank to create room"
              value={joinID}
              onChange={e => setJoinID(e.target.value)}
            />
          </div>

          <div>
            {joinID === "" ? (
              <button
                type="submit"
                style={{ marginTop: 30 }}
                className={
                  name === "" ? "nes-btn is-dsiabled" : "nes-btn is-primary"
                }
                onClick={e => {
                  e.preventDefault();
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
                className={
                  name === "" ? "nes-btn is-dsiabled" : "nes-btn is-primary"
                }
                onClick={e => {
                  e.preventDefault();
                  socket.emit("join", joinID);
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
