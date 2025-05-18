import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        userName: credentials.userName,
        password: credentials.password,
      });

      const token = response.data.accessToken;
      localStorage.setItem("token", token);

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const protectedUser = createAsyncThunk(
  "auth/protectedUser",
  async () => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token");

    try {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { token, user: res.data.user };
    } catch (err) {
      return rejectWithValue("Invalid or expired token");
    }
  }
);

const initialState = {
  userId: null,
  userName: null,
  token: localStorage.getItem("token") || null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(protectedUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        state.error = null;
      })
      .addCase(protectedUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
