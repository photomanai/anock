import { addMessageRealTime } from "../store/slices/chatSlice";
import socket from "./socket";

export const registerSocketListeners = (store, roomId) => {
  socket.emit("joinRoom", roomId);

  socket.on("chat:message", (msg) => {
    store.dispatch(addMessageRealTime(msg));
  });
};
