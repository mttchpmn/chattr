const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const shortid = require("shortid");
const path = require("path");
const PORT = process.env.PORT || 4000;

// Serve React app from server
app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Configure cache for storing chat histories and room data
const roomCache = {};

// Handle Socket communication
io.on("connection", socket => {
  const { id } = socket;
  console.log(`${id.slice(0, 5)}... has connected`);

  socket.on("create", () => {
    // Create new identifier for room
    const roomID = shortid.generate();

    // Create new room object in cache
    const newRoom = {
      roomID: roomID,
      online: 1,
      messages: [],
    };
    roomCache[roomID] = newRoom;

    // Join room
    socket.join(roomID);
    io.to(roomID).emit("create", roomID);
  });

  socket.on("join", ({ joinID, name }) => {
    socket.join(joinID);
    const { messages } = roomCache[joinID];
    io.to(id).emit("join", { roomID: joinID, messages });

    socket.to(joinID).emit("joined", name);
  });

  socket.on("leave", ({ roomID, name }) => {
    socket.to(roomID).emit("left", name);
    socket.leave(roomID);

    // Handle empty room
    io.in(roomID).clients((err, clients) => {
      if (!clients.length) console.log("ROOM EMPTY - deleting room from cache");
      delete roomCache[roomID];
    });
  });

  socket.on("typing", ({ name, roomID }) => {
    socket.to(roomID).broadcast.emit("typing", name);
  });

  socket.on("chat message", msg => {
    const { name, text, roomID } = msg;

    console.log("roomCache", roomCache);
    roomCache[roomID].messages.push(msg);

    io.to(roomID).emit("chat message", { name, text });
    console.log("roomCache", roomCache);
  });
});

server.listen(PORT, () => console.log(`Listening at *:${PORT}`));
