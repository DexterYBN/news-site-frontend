import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../serverUrl.js";

// Начальный state
const initialState = {
  loading: false,
  error: null,
  news: [],
};

// Санка GET

export const fetchNews = createAsyncThunk(
  "get/news/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/news`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const news = await res.json();

      if (news.error) {
        return thunkAPI.rejectWithValue(news.error);
      }
      return thunkAPI.fulfillWithValue(news);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// CreateSlice
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.news = action.payload;
      });
  },
});

export default newsSlice.reducer;
