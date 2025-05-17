import React from "react";
import { useDispatch } from "react-redux";
import {
  clearMessages,
  fetchMessages,
  setRoomId,
} from "../store/slices/chatSlice";

function RoomSelect() {
  const dispatch = useDispatch();

  const handleRoomChange = (roomId) => {
    dispatch(clearMessages());
    dispatch(setRoomId(roomId));
    dispatch(fetchMessages(roomId));
  };

  return (
    <div>
      <button onClick={() => handleRoomChange("room123")}>Room 123</button>
      <button onClick={() => handleRoomChange("room456")}>Room 456</button>
    </div>
  );
}

export default RoomSelect;
