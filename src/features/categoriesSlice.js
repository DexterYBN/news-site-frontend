import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const res = await fetch("http://localhost:4000/categories");
      const categories = await res.json();

      if (categories.error) {
        return thunkAPI.rejectWithValue(categories.error);
      }

      return thunkAPI.fulfillWithValue(categories);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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