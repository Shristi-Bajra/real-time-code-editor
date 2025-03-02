const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};  // Maps socket IDs to usernames

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    };
  });
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  // Handle user joining a room
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    if (userSocketMap[socket.id]) {
      return;  // Exit if the user is already in the room
    }

    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    // Notify all clients in the room that a new user has joined
    clients.forEach(({ socketId, username }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // Handle code changes
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    console.log('receiving', code);
    socket.broadcast.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Handle syncing code with a specific client
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Handle disconnecting
  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];  // Get all rooms the socket is in
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];  // Remove the user from the map
    socket.leave();  // Remove the socket from all rooms
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
