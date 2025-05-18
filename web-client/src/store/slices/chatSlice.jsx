import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/axiosConfig";

const initialState = {
  roomId: null,
  messages: [],
  loading: false,
  error: null,
};

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (roomId) => {
    try {
      const res = await api.get(`/chat/messages?roomId=${roomId}`);
      return res.data;
    } catch (error) {
      if (err.response?.status === 401) {
        return rejectWithValue("UNAUTHORIZED");
      }
      return rejectWithValue(err.response?.data || "Unknown error");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ userName, message, roomId }) => {
    try {
      await api.post(`/chat/sender`, {
        userName,
        message,
        roomId,
      });
    } catch (error) {
      return rejectWithValue(err.response?.data || "Unknown error");
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { addMessageRealTime, clearMessages, setRoomId } =
  chatSlice.actions;

export default chatSlice.reducer;
