import express from "express";
import http from "http";
import { Server } from "socket.io";

import exphbs from "express-handlebars";

import rootRouter from "./routers/rootRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// socket.io
io.on("connection", (socket) => {
  console.log("a user connected", socket.client.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.client.id);
  });
});

//use express instead of body-parser
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));

// view engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/", rootRouter);

export { server };
