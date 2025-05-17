import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const initialState = {
  roomId: "room123",
  messages: [],
  userName: "Adil",
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
      const res = await axios.post(`${BASE_URL}/chat/sender`, {
        userName,
        message,
        roomId,
      });
      // return res.data.newMessage;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    // .addCase(sendMessage.fulfilled, (state, action) => {
    //   state.messages.push(action.payload);
    // });
  },
});

export const { addMessageRealTime } = chatSlice.actions;

export default chatSlice.reducer;
