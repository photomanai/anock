import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { fetchMessages } from "../store/slices/chatSlice";

const socket = io(import.meta.env.VITE_BASE_URL);

const MessageViewer = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const messageContainerRef = useRef(null);
  const roomId = "room123";

  // const getMessages = () => {
  //   axios
  //     .get(
  //       `${import.meta.env.VITE_BASE_API_URL}/chat/messages?roomId=${roomId}`
  //     )
  //     .then((res) => {
  //       setMessages(res.data);
  //     })
  //     .catch(console.error);

  //   socket.emit("joinRoom", roomId);

  //   const handleMessage = (msg) => {
  //     console.log("New Message:", msg);
  //     setMessages((prev) => [...prev, msg]);
  //   };

  //   socket.on("chat:message", handleMessage);

  //   return () => {
  //     socket.off("chat:message", handleMessage);
  //   };
  // };

  useEffect(() => {
    dispatch(fetchMessages(roomId));
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
