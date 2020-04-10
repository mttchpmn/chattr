const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 4000;

io.on("create", room => {
  console.log("CREATE called");
  console.log("room", room);
});

io.on("connection", socket => {
  const { id } = socket;
  console.log(`${id} has connected`);

  socket.on("create", () => {
    console.log(`Create called by ${id}`);

    io.to(id).emit("create", id);
  });

  socket.on("join", joinID => {
    console.log(`JOIN : ${joinID}`);
    socket.join(joinID);
  });

  socket.on("chat message", ({ name, text }) => {
    console.log(`${name} : ${text}`);
    io.emit("chat message", { name, text });
  });
});

server.listen(PORT, () => console.log(`Listening at *:${PORT}`));
