import { useEffect } from "react";
import SendBar from "../components/SendBar";
import MessageViewer from "../components/MessageViewer";
import RoomSelect from "../components/RoomSelect";
import { registerSocketListeners } from "../socket/socketListenets";
import store from "../store/store";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const roomId = useSelector((state) => state.chat.roomId);
  useEffect(() => {
    registerSocketListeners(store, roomId);
  }, [roomId]);

  return (
    <div>
      <RoomSelect />
      <MessageViewer />
      <SendBar />
    </div>
  );
};

export default ChatPage;
