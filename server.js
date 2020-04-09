const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 4000;

io.on("connection", socket => {
  const { id } = socket;

  console.log(`${id} has connected`);
  socket.on("chat message", msg => {
    console.log(`${id} : ${msg}`);
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => console.log(`Listening at *:${PORT}`));
