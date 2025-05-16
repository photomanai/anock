import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_URL);

const MessageViewer = () => {
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);
  const roomId = "room123";

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_API_URL}/chat/messages?roomId=${roomId}`
      )
      .then((res) => {
        setMessages(res.data);
      })
      .catch(console.error);

    socket.emit("joinRoom", roomId);

    const handleMessage = (msg) => {
      console.log("New Message:", msg);
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat:message", handleMessage);

    return () => {
      socket.off("chat:message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div className="message" ref={messageContainerRef}>
        {messages.map((message) => (
          <div key={message._id}>
            <h2>{message.userName}</h2>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageViewer;
