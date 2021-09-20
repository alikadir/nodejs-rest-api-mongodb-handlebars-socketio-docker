import express from "express";
import http from "http";
import exphbs from "express-handlebars";
import { socketServiceInit } from "./services/socketService.js";

import rootRouter from "./routers/rootRouter.js";

const app = express();
const server = http.createServer(app);

await socketServiceInit(server);

//use express instead of body-parser
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("public"));

// view engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use("/", rootRouter);

export { server };
