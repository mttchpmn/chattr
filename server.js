const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 4000;

io.on("connection", socket => {
  const { id } = socket;

  console.log(`${id} has connected`);
  socket.on("chat message", ({ name, text }) => {
    console.log(`${name} : ${text}`);
    io.emit("chat message", { name, text });
  });
});

server.listen(PORT, () => console.log(`Listening at *:${PORT}`));
