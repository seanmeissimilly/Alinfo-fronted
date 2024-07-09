import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import {
  userLoginReducer,
  userRegisterReducer,
  userSoloReducer,
  userListReducer,
  userEditReducer,
} from "./userReducers";
import {
  blogListReducer,
  blogCreateReducer,
  blogDetailsReducer,
  createCommentReducer,
  blogDeleteReducer,
  blogUpdateReducer,
} from "./blogReducers";

const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: {
    // User stuff
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userSolo: userSoloReducer,
    userList: userListReducer,
    userEdit: userEditReducer,

    // Blog stuff
    blogList: blogListReducer,
    blogCreate: blogCreateReducer,
    soloBlog: blogDetailsReducer,
    commentBlog: createCommentReducer,
    deleteBlog: blogDeleteReducer,
    updateBlog: blogUpdateReducer,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
