import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    blogUpdate: (state, action) => {
      // Lógica  para actualizar un blog.
    },
    blogDelete: (state, action) => {
      // Lógica para eliminar un blog.
    },
    createComment: (state, action) => {
      // Lógica para añadir un comentario.
    },
    blogDetails: (state, action) => {
      //  Lógica para listar un solo blog.
    },
    blogCreate: (state, action) => {
      // Lógica para añadir un blog.
    },
    blogList: (state, action) => {
      //  Lógica para listar los blogs existentes.
    },
  },
});

export const {
  blogUpdate,
  blogDelete,
  createComment,
  blogDetails,
  blogCreate,
  blogList,
} = blogSlice.actions;
export default blogSlice.reducer;
