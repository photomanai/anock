import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../config/axiosConfig";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login`, {
        userName: credentials.userName,
        password: credentials.password,
      });
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      console.log(response.data);

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
      const res = await api.get(`/auth/protected`);

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
  isAuthResolved: true,
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
      .addCase(protectedUser.pending, (state) => {
        state.loading = true;
        state.isAuthResolved = false;
      })
      .addCase(protectedUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.user.userId;
        state.userName = action.payload.user.userName;
        state.error = null;
        state.loading = false;
        state.isAuthResolved = true;
      })
      .addCase(protectedUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthResolved = true;
      });
  },
});

export default authSlice.reducer;
