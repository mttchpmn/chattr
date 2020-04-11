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

// Handle Socket communication
io.on("connection", socket => {
  const { id } = socket;
  console.log(`${id} has connected`);

  socket.on("create", () => {
    const newID = shortid.generate();
    socket.join(newID);
    io.to(newID).emit("create", newID);
  });

  socket.on("join", ({ joinID, name }) => {
    socket.join(joinID);
    io.to(id).emit("join", joinID);
    socket.to(joinID).emit("joined", name);
  });

  socket.on("leave", ({ roomID, name }) => {
    socket.to(roomID).emit("left", name);
  });

  socket.on("typing", ({ name, roomID }) => {
    socket.to(roomID).broadcast.emit("typing", name);
  });

  socket.on("chat message", ({ roomID, name, text }) => {
    io.to(roomID).emit("chat message", { name, text });
  });
});

server.listen(PORT, () => console.log(`Listening at *:${PORT}`));
