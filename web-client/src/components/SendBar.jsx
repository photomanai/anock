import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { sendMessage } from "../store/slices/chatSlice";

const SendBar = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("User");
  const [message, setMessage] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_API_URL;

  const handleSubmit = () => {
    dispatch(sendMessage({ userName, message, roomId: "room123" }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/chat/sender`, {
  //       userName,
  //       message,
  //       roomId: "room123",
  //     });
  //     setMessage("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
