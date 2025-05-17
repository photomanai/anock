import { addMessageRealTime } from "../store/slices/chatSlice";
import socket from "./socket";

let previousRoomId = null;

export const registerSocketListeners = (store, roomId) => {
  if (previousRoomId && previousRoomId !== roomId) {
    socket.emit("leaveRoom", previousRoomId);
  }
  socket.off("chat:message");

  socket.emit("joinRoom", roomId);
  previousRoomId = roomId;

  socket.on("chat:message", (msg) => {
    store.dispatch(addMessageRealTime(msg));
  });
};
