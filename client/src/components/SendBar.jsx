import React, { useState } from "react";
import axios from "axios";

const SendBar = () => {
  const [userName, setUserName] = useState("User");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/chat/sender",
        {
          userName,
          message,
        }
      );
      setMessage("");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sender">
      <input
        type="text"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default SendBar;
