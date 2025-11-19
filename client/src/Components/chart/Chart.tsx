import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

type Props = {
  socket: Socket;
  userName: string;
  roomID: string;
};
type Message = {
  room: string;
  author: string;
  message: string;
  time: string;
};

const Chart = (props: Props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: props.roomID,
        author: props.userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await props.socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      setMessageList((prev) => [...prev, data]);
    };

    props.socket.on("receive_message", handleReceiveMessage);

    // 🧹 Cleanup function to prevent duplicate listeners
    return () => {
      props.socket.off("receive_message", handleReceiveMessage);
    };
  }, [props.socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={props.userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type here any thing..."
          value={currentMessage}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          onChange={(event) => {
            setCurrentMessage(event?.target?.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chart;
