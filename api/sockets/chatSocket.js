module.exports = (io, socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room: ${roomId}`);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} leave room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("disconnected:", socket.id);
  });
};
