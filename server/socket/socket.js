// socket/socketHandler.js
function socketConnect(io) {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);
    // Join Room
    socket.on('join_room', (data)=>{
      socket.join(data);
      console.log(`User width ID: ${socket.id} joined room: ${data}`)
    })
    socket.on('send_message',(data)=>{
      console.log(`User send message: ${data}`);
      socket.to(data.room).emit('receive_message', data)
    })
    // Listen for messages
    socket.on("message", (data) => {
      console.log("💬 Message received:", data);
      io.emit("message", data); // Broadcast to all clients
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
}

module.exports = { socketConnect };
