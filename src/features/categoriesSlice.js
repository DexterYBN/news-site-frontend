import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../serverUrl";

// Начальный state
const initialState = {
  loading: false,
  error: null,
  categories: [],
};

// Санка GET

export const fetchCategories = createAsyncThunk(
  "get/categories/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/categories`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const categories = await res.json();

      if (categories.error) {
        return thunkAPI.rejectWithValue(categories.error + "fweg");
      }

      return thunkAPI.fulfillWithValue(categories);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message + "fweg");
    }
  }
);

// CreateSlice
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET

      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.categories = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
