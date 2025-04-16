import React from "react";
import SendBar from "../components/SendBar";
import MessageViewer from "../components/MessageViewer";

const ChatPage = () => {
  return (
    <div>
      <MessageViewer />
      <SendBar />
    </div>
  );
};

export default ChatPage;
