import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from '../serverUrl.js';

// Начальный state

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Санка GET

export const fetchUsers = createAsyncThunk(
  "get/Users/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });
      const users = await res.json();

      if (users.error) {
        return thunkAPI.rejectWithValue(users.error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CreateSlice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.error = null;
        state.users = action.payload;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
