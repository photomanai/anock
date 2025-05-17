import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../store/slices/chatSlice";

const MessageViewer = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const roomId = useSelector((state) => state.chat.roomId);
  const messageContainerRef = useRef(null);

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
