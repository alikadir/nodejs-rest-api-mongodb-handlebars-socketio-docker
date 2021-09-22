import { Server } from "socket.io";

export const socketServiceInit = async (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected", socket.client.id);
    socket.on("chat message", (msg) => {
      console.log("chat message", msg);
      io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.client.id);
    });
  });
};
