import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

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
  async ({ blog, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        body: `${blog.body}`,
      };

      const { data } = await blogApi.put(`/put/${blog.id}/`, body, config);

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

      const { data } = await blogApi.post(`/comment/${id}/`, text, config);

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
  async ({ body, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await blogApi.post(`/post/`, { body }, config);

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

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    bloginfo: {},
    blogs: [],
    loading: false,
    error: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(blogDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blogDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.bloginfo = action.payload;
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
      state.blogs.push(action.payload);
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
      state.bloginfo = action.payload;
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
      state.bloginfo = action.payload;
      state.success = true;
    });
    builder.addCase(blogCreate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const {
//   blogUpdate,
//   blogDelete,
//   createComment,
//   blogDetails,
//   blogCreate,
//   blogList,
// } = blogSlice.actions;
export default blogSlice.reducer;
