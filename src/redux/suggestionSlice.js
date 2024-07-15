import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const suggestionsApi = axios.create({
  baseURL: `${URL}/suggestions`,
});

//todo:  Lógica para listar los suggestionss existentes.
export const suggestionList = createAsyncThunk(
  "suggestionsList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.get(`/`, config);
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

//todo: Lógica para listar un solo suggestionss.
export const suggestionDetails = createAsyncThunk(
  "suggestionsDetails",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.get(`/${id}/`, config);
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

//todo: Lógica  para actualizar un suggestions.
export const suggestionUpdate = createAsyncThunk(
  "suggestionsUpdate",
  async ({ id, body, resolved, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.put(
        `/${id}/`,
        { body, resolved },
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
//todo: Lógica para eliminar un suggestions.
export const suggestionDelete = createAsyncThunk(
  "suggestionsDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.delete(`/${id}/`, config);
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

//todo: Lógica para añadir un suggestions.
export const suggestionCreate = createAsyncThunk(
  "suggestionsCreate",
  async ({ body, resolved, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await suggestionsApi.post(
        `/`,
        { body, resolved },
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

const suggestionInfoStorage = localStorage.getItem("suggestionInfo")
  ? JSON.parse(localStorage.getItem("suggestionInfo"))
  : {};

const initialState = {
  suggestionInfo: suggestionInfoStorage,
  suggestions: [],
  loading: false,
  error: false,
  success: false,
};

export const suggestionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(suggestionDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(suggestionDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestionInfo = action.payload;
      state.success = true;
    });
    builder.addCase(suggestionDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestionList.pending, (state, action) => {
      state.loading = true;
      state.suggestions = [];
    });
    builder.addCase(suggestionList.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestions = action.payload;
      state.success = true;
    });
    builder.addCase(suggestionList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestionUpdate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(suggestionUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestionInfo = action.payload;
      state.success = true;
    });
    builder.addCase(suggestionUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestionDelete.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(suggestionDelete.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      const { id } = action.payload;
      if (id) {
        state.suggestions = state.suggestions.filter(
          (suggestion) => suggestion.id !== id
        );
      }
    });
    builder.addCase(suggestionDelete.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(suggestionCreate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(suggestionCreate.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestionInfo = action.payload;
      state.success = true;
    });
    builder.addCase(suggestionCreate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const {

// } = suggestionsSlice.actions;
export default suggestionSlice.reducer;
