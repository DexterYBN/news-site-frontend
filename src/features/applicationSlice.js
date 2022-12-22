import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Начальный state

const initialState = {
  registrationing: false,
  logining: false,
  error: null,
  token: localStorage.getItem("token"),
  login: localStorage.getItem("login"),
};

// Санка POST

export const authRegister = createAsyncThunk(
  "auth/register",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Санка POST

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("token", token.token);
      localStorage.setItem("login", token.login);

      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CreateSlice

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // POST

      .addCase(authRegister.rejected, (state, action) => {
        state.error = action.payload;
        state.registrationing = false;
      })
      .addCase(authRegister.pending, (state) => {
        state.error = null;
        state.registrationing = true;
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.error = null;
        state.registrationing = false;
      })

      // POST

      .addCase(authLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.logining = false;
      })
      .addCase(authLogin.pending, (state) => {
        state.error = null;
        state.logining = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.error = null;
        state.logining = false;
        state.token = action.payload;
      });
  },
});

export default applicationSlice.reducer;
