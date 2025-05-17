import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const initialState = {
  roomId: null,
  messages: [],
  loading: false,
};

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (roomId) => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/messages?roomId=${roomId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ userName, message, roomId }) => {
    try {
      await axios.post(`${BASE_URL}/chat/sender`, {
        userName,
        message,
        roomId,
      });
    } catch (error) {
      console.error(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessageRealTime: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
      // fetchMessages(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const { addMessageRealTime, clearMessages, setRoomId } =
  chatSlice.actions;

export default chatSlice.reducer;
