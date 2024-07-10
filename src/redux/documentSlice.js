import { createSlice } from "@reduxjs/toolkit";

export const documentSlice = createSlice({
  name: "document",
  initialState: [],
  reducers: {
    documentUpdate: (state, action) => {
      // Lógica  para actualizar un document.
    },
    documentDelete: (state, action) => {
      // Lógica para eliminar un document.
    },
    documentDetails: (state, action) => {
      //  Lógica para listar un solo document.
    },
    documentCreate: (state, action) => {
      // Lógica para añadir un document.
    },
    documentList: (state, action) => {
      //  Lógica para listar los documents existentes..
    },
  },
});

export const {
  documentUpdate,
  documentDelete,
  documentDetails,
  documentCreate,
  documentList,
} = documentSlice.actions;
export default documentSlice.reducer;
