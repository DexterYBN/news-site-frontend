import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Начальный state
const initialState = {
  loading: false,
  error: false,
  comments: [],
};

// Санка GET

export const fetchComments = createAsyncThunk(
  "get/comments/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/comments", {
        // headers: {
        //   Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        // },
      });
      const comments = await res.json();

      if (comments.error) {
        return thunkAPI.rejectWithValue(comments.error);
      }

      return thunkAPI.fulfillWithValue(comments);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Санка POST

export const createComment = createAsyncThunk(
  "post/comments/create",
  async ({ text, createdAt, id }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/comment", {
        method: "POST",
        body: JSON.stringify({ text: text, date: createdAt, news: id }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });

      const comments = await res.json();

      if (comments.error) {
        return thunkAPI.rejectWithValue(comments.error);
      }

      return thunkAPI.fulfillWithValue(comments);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Санка DELETE

export const deleteComment = createAsyncThunk(
  "post/comment/delete",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/comment/" + data.id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });

      const comments = await res.json();

      if (comments.error) {
        return thunkAPI.rejectWithValue(comments.error);
      }
      return thunkAPI.fulfillWithValue(comments);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CreateSlice

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET

      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.comments = action.payload;
      })

      // POST

      .addCase(createComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createComment.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.error = null;
        state.comments.push(action.payload);
        state.loading = false;
      })

      // DELETE

      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.error = null;
        state.comments = state.comments.map((comment) => {
          if (comment._id === action.meta.arg.id) {
            comment.loading = true;
          }
          return comment;
        });
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.error = null;
        state.comments = state.comments.filter((comment) => {
          return comment._id !== action.payload._id;
        });
        state.loading = false;
      });
  },
});

export default commentsSlice.reducer;
