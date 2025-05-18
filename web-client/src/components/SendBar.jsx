import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/slices/chatSlice";

const SendBar = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { roomId, error } = useSelector((state) => state.chat);
  const { userName } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    console.log(error);
    if (!message.trim() || !userName) {
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
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Send</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SendBar;
