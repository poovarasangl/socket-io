const express = require('express');
const app = express();
const http = require('node:http');
const cors = require('cors');
const {Server} = require('socket.io')
app.use(cors);
const server = http.createServer(app);
const {socketConnect} = require('./socket/socket');
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
    }
})
socketConnect(io)




server.listen(3001, ()=>{
    console.info('Server is running on port - ',3001)
})