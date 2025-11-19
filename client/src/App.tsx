import React, { useState } from "react";
import "./App.css";
import { io, Socket } from "socket.io-client";
import Chart from "./Components/chart/Chart";
const socketUrl = "http://localhost:3001";
const socket: Socket = io(socketUrl, {
  transports: ["websocket"], // Optional: ensures WebSocket only
});
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setShowchat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowchat(true);
    }
  };
  return (
    <div className="App">
      {!showchat? (
        <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input
          type="text"
          placeholder="Enter user name"
          onChange={(event) => setUsername(event?.target?.value)}
        />
        <input
          type="text"
          placeholder="Room ID"
          onChange={(event) => setRoom(event?.target?.value)}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      ): (
        <Chart socket={socket} userName={username} roomID={room} />
      )}
      
      
    </div>
  );
}

export default App;
