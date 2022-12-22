import { configureStore } from "@reduxjs/toolkit";
import application from "../features/applicationSlice";
import users from "../features/userSlice";
import comments from "../features/commentSlice";

export const store = configureStore({
  reducer: {
    application,
    users,
    comments,
  },
});
