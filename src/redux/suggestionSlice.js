import { createSlice } from "@reduxjs/toolkit";

export const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: [],
  reducers: {
    suggestionsUpdate: (state, action) => {
      // Lógica  para actualizar un suggestions.
    },
    suggestionsDelete: (state, action) => {
      // Lógica para eliminar un suggestions.
    },
    suggestionsDetails: (state, action) => {
      //  Lógica para listar un solo suggestions.
    },
    suggestionsCreate: (state, action) => {
      // Lógica para añadir un suggestions.
    },
    suggestionsList: (state, action) => {
      //  Lógica para listar los suggestions existentes.
    },
  },
});

export const {
  suggestionsUpdate,
  suggestionsDelete,
  suggestionsDetails,
  suggestionsCreate,
  suggestionsList,
} = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
