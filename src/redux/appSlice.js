import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: [],
  reducers: {
    appUpdate: (state, action) => {
      // Lógica  para actualizar un app.
    },
    appDelete: (state, action) => {
      // Lógica para eliminar un app.
    },
    appDetails: (state, action) => {
      //  Lógica para listar un solo app.
    },
    appCreate: (state, action) => {
      // Lógica para añadir un app.
    },
    appList: (state, action) => {
      //  Lógica para listar los apps existentes.
    },
  },
});

export const { appUpdate, appDelete, appDetails, appCreate, appList } =
  appSlice.actions;
export default appSlice.reducer;
