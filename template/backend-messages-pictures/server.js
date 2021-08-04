require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

// import socket.io & cors security for chat
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

// SOCKET.IO SECTION
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";
// port for socket.io messages
const PORT = process.env.SOCKET_MESSAGES_UPLOAD_PORT;
// init socket connection
io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Listen start typing events
  socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
    console.log("Received true on server :", data);
    io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
  });
  // Listen stop typing events
  socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
    console.log("Received false on server :", data);
    io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

// UPLOAD PICTURES SECTION
global.__basedir = __dirname;
// cors option for upload server
var corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(corsOptions));
// routes for upload picture server
const initRoutes = require("./src/routes");
// middleware fro upload picture
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// listener for upload pictures and messages transfert
server.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
