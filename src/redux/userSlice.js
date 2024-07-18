import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

const userApi = axios.create({
  baseURL: `${URL}/users`,
});

//Todo: Lógica hacer el login de un usuario.
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
      localStorage.setItem("userInfo", JSON.stringify(data));
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
//Todo: Lógica hacer el registro de un usuario.
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
      localStorage.setItem("userInfo", JSON.stringify(data));
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
//Todo: Lógica hacer el update de un usuario.
export const userUpdate = createAsyncThunk(
  "userUpdate",
  async (
    { user_name, email, password, bio, image, role, token, id },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await userApi.put(
        "/put/",

        { user_name, email, role, password, bio, image, id },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
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
//Todo: Lógica para borrar un usuario.
export const userDelete = createAsyncThunk(
  "userDelete",
  async ({ user_name, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await userApi.delete("/delete/", user_name, config);

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
//Todo: Lógica listar los usuarios.
export const userList = createAsyncThunk(
  "userList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await userApi.get(`/getUsers/`, config);

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
// Todo:Lógica listar un usuario.
export const userSolo = createAsyncThunk(
  "userSolo",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await userApi.get(`/${id}/`, config);
      localStorage.setItem("userSolo", JSON.stringify(data));
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
// Todo:Lógica listar el usuario que está logueado.
export const userRefresh = createAsyncThunk(
  "userRefresh",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await userApi.get(`userProfile`, config);

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
// Todo: Lógica hacer subir la foto de un usuario.
export const userUploadImage = createAsyncThunk(
  "userUploadImage",
  async ({ e, id, token }, { rejectWithValue }) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await userApi.post(
        "/image/",
        { user_id: id, formData },
        config
      );

      return data;
    } catch (error) {
      rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null; // Cambio esto a null para que no almacene nada si no hay datos en localStorage

const userOnlyStorage = localStorage.getItem("userSolo")
  ? JSON.parse(localStorage.getItem("userSolo"))
  : null; // Cambio esto a null para que no almacene nada si no hay datos en localStorage

const initialState = {
  userInfo: userInfoStorage ? userInfoStorage : {}, // Solo almacena userInfo si userInfoStorage no es null,
  users: [],
  userOnly: userOnlyStorage ? userOnlyStorage : {},
  loading: false,
  error: false,
  success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state, action) => {
      // Lógica para desloguear un usuario.
      state.userInfo = {};
      state.userOnly = {};
      state.loading = false;
      state.users = [];
      state.error = false;
      state.success = false;
      //Borro los datos del usuario del almacenamiento local.
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(userRegister.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(userUpdate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = {
        //! copio el mismo estado que ya tenía.
        ...state.userInfo,
        //! Actualizo solo las propiedades que vienen
        email: action.payload.email,
        user_name: action.payload.user_name,
        role: action.payload.role,
        is_admin: action.payload.is_admin,
        bio: action.payload.bio,
        image: action.payload.image,
      };
      state.success = true;
    });
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(userList.pending, (state, action) => {
      state.loading = true;
      state.users = [];
    });
    builder.addCase(userList.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.success = true;
    });
    builder.addCase(userList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(userSolo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userSolo.fulfilled, (state, action) => {
      state.loading = false;
      state.userOnly = action.payload;
      state.success = true;
    });
    builder.addCase(userSolo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(userDelete.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userDelete.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(userDelete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(userUploadImage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userUploadImage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(userUploadImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(userRefresh.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userRefresh.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = {
        //! copio el mismo estado que ya tenía.
        ...state.userInfo,
        //! Actualizo solo las propiedades que vienen
        email: action.payload.email,
        user_name: action.payload.user_name,
        role: action.payload.role,
        is_admin: action.payload.is_admin,
        bio: action.payload.bio,
        image: action.payload.image,
      };
      state.success = true;
    });
    builder.addCase(userRefresh.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
