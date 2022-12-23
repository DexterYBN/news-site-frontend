import { configureStore } from "@reduxjs/toolkit";
import application from "../features/applicationSlice";
import users from "../features/userSlice";
import comments from "../features/commentSlice";
import categories from "../features/categoriesSlice";

export const store = configureStore({
  reducer: {
    application,
    users,
    comments,
    categories,
  },
});
