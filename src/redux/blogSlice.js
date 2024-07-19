import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

const blogApi = axios.create({
  baseURL: `${URL}/blogs`,
});

//todo: Lógica para listar los blogs existentes.
export const blogList = createAsyncThunk(
  "blogList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await blogApi.get(`/get/`, config);
      // localStorage.setItem("blogs", JSON.stringify(data));
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

//todo: Lógica para listar un solo blog.
export const blogDetails = createAsyncThunk(
  "blogDetails",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await blogApi.get(`/get/${id}/`, config);
      // localStorage.setItem("blogInfo", JSON.stringify(data));
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

//todo: Lógica  para actualizar un blog.
export const blogUpdate = createAsyncThunk(
  "blogUpdate",
  async ({ id, title, body, image, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let data;
      if (image) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("image", image);
        config.headers["Content-Type"] = "multipart/form-data";
        data = await blogApi.put(`/put/${id}/`, formData, config);
      } else {
        config.headers["Content-Type"] = "application/json";
        data = await blogApi.put(`/put/${id}/`, { title, body }, config);
      }

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

//todo: Lógica para eliminar un blog.
export const blogDelete = createAsyncThunk(
  "blogDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await blogApi.delete(`/delete/${id}`, config);

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

//todo: Lógica para añadir un comentario.
export const createComment = createAsyncThunk(
  "createComment",
  async ({ id, text, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await blogApi.post(
        `/comment/`,
        { blog: id, text },
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

//todo: Lógica para borrar un comentario.
export const deleteComment = createAsyncThunk(
  "deleteComment",
  async ({ comment_id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await blogApi.delete(`/comment/${comment_id}/`, config);

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

//todo: Lógica para añadir un blog.
export const blogCreate = createAsyncThunk(
  "blogCreate",
  async ({ title, body, image, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let data;
      if (image) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("image", image);
        config.headers["Content-Type"] = "multipart/form-data";
        data = await blogApi.post(`/post/`, formData, config);
      } else {
        config.headers["Content-Type"] = "application/json";
        // localStorage.setItem("blogInfo", JSON.stringify(data));
        data = await blogApi.post(`/post/`, { title, body }, config);
      }

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

const blogsInfoStorage = localStorage.getItem("blogs")
  ? JSON.parse(localStorage.getItem("blogs"))
  : null; // Cambio esto a null para que no almacene nada si no hay datos en localStorage

const blogInfoStorage = localStorage.getItem("blogInfo")
  ? JSON.parse(localStorage.getItem("blogInfo"))
  : {};

const initialState = {
  blogInfo: blogInfoStorage,
  blogs: blogsInfoStorage ? [blogsInfoStorage] : [],
  loading: false,
  error: false,
  success: false,
  success_comment: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createCommentReset: (state, action) => {
      state.blogInfo = {};
      state.success_comment = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(blogDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blogDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.blogInfo = action.payload;
      state.success = true;
    });
    builder.addCase(blogDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(blogList.pending, (state, action) => {
      state.loading = true;
      state.blogs = [];
    });
    builder.addCase(blogList.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload; // Reiniciar el array blogs con los elementos del payload
      state.success = true;
    });
    builder.addCase(blogList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(blogUpdate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blogUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.blogInfo = action.payload;
      state.success = true;
    });
    builder.addCase(blogUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(blogDelete.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blogDelete.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      const { id } = action.payload;
      //todo: Quito el blog que borré de la lista de blogs.
      if (id) {
        state.blogs = state.blogs.filter((blog) => blog.id !== id);
      }
    });
    builder.addCase(blogDelete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createComment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.success_comment = true;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(blogCreate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blogCreate.fulfilled, (state, action) => {
      state.loading = false;
      state.blogInfo = action.payload;
      state.success = true;
    });
    builder.addCase(blogCreate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteComment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.success_comment = true;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { createCommentReset } = blogSlice.actions;
export default blogSlice.reducer;
