import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/slices/chatSlice";

const SendBar = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("User");
  const [message, setMessage] = useState("");
  const roomId = useSelector((state) => state.chat.roomId);

  const handleSubmit = () => {
    if (!message.trim() || !userName.trim()) {
      alert("All fields are required.");
      return;
    }
    if (!roomId) {
      alert("Please select room");
      return;
    }
    dispatch(sendMessage({ userName, message, roomId }));
    setMessage("");
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
