import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.jsx";
import { BrowserRouter } from "react-router-dom";
import { registerSocketListeners } from "./socket/socketListenets.jsx";

const ROOM_ID = "room123";
registerSocketListeners(store, ROOM_ID);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
