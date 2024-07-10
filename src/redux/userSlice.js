import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const userApi = axios.create({
  baseURL: `${URL}/users`,
});

// Lógica hacer el login de un usuario.
export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await userApi.post(
        "/login/",
        { email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

// Lógica hacer el registro de un usuario.
export const userRegister = createAsyncThunk(
  "userRegister",
  async ({ user_name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await userApi.post(
        "/register/",
        { user_name, email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    loading: false,
    error: false,
  },
  reducers: {
    userLogout: (state, action) => {
      // Lógica para desloguear un usuario.
      return { userInfo: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo.push(action.payload);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(userRegister.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo.push(action.payload);
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  userLogout,
  // userUpdate,
  // userDelete,
  // userList,
  // userSolo,
} = userSlice.actions;
export default userSlice.reducer;
