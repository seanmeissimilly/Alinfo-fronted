import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";
import appReducer from "./appSlice";
import documentReducer from "./documentSlice";
import suggestionReducer from "./suggestionSlice";

export const store = configureStore({
  reducer: {
    // User stuff
    user: userReducer,

    // // Blog stuff
    // blog: blogReducer,

    // // App stuff
    // app: appReducer,

    // // Document stuff
    // document: documentReducer,

    // // Suggestion stuff
    // suggestion: suggestionReducer,
  },
});
