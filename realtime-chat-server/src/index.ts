import ChatApp from "./ChatApp";
import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import routes from "./routes";
import path from "path";

const app = express();

const PORT = process.env.PORT || 5000;
var CORS_OPTIONS;

if (process.env.NODE_ENV !== "production") {
  CORS_OPTIONS = {
    origin: "*",
    methods: ["GET", "POST"],
  };
}
app.use(express.static(path.join(__dirname, "./../public")));
app.use(routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: CORS_OPTIONS,
});

const chatApp = new ChatApp(io);

server.listen(PORT, () => {
  console.log("Server is listening on " + PORT);
});
