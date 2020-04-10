import React from "react";

import socket from "../../socket";

function HomeScreen({ handleSubmit }) {
  const [name, setName] = React.useState("");
  const [joinID, setJoinID] = React.useState("");

  return (
    <div>
      <h2>Create or join room</h2>

      <div>
        Enter your name:
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div>
        <button
          onClick={() => {
            socket.emit("create");
            handleSubmit(name);
          }}
        >
          Create
        </button>
      </div>

      <div>
        <input
          value={joinID}
          autoComplete="off"
          onChange={e => setJoinID(e.target.value)}
        />
        <button
          onClick={() => {
            socket.emit("join", joinID);
            handleSubmit(name);
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
