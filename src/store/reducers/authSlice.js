import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", { email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.msg || "Login failed");
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/logout");
      return response.data;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
)

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.msg || "Failed to fetch users");
    }
  }
)

const storedUser = localStorage.getItem("user");
const parsedUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
const storedToken = localStorage.getItem("token");
const initialState = {
  user: parsedUser,
  token: storedToken || null,
  isAuthenticated: storedUser ? true : false,
  loading: false,
  error: null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginWithGoogle: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginWithGoogle } = authSlice.actions;

export default authSlice.reducer;
