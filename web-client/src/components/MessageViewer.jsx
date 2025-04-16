import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const MessageViewer = () => {
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_BASE_API_URL;

  const getMessage = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/chat/viewer`);
      // console.log(response.data.Messages);

      const sortedMessages = response.data.Messages.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setMessages(sortedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessage();
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
