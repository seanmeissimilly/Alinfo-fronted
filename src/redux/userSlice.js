import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    loading: false,
    error: false,
  },
  reducers: {
    // userLogout: (state, action) => {
    //   // Lógica para desloguear un usuario.
    //   return { userInfo: [] };
    // },
    // userLogin: (state, action) => {
    //   // Lógica para hacer el login de un usuario.
    //   return { userInfo: action.payload };
    // },
    // userRegister: (state, action) => {
    //   // Lógica para registrar un usuario.
    //   return { userInfo: action.payload };
    // },
    // userUpdate: (state, action) => {
    //   // Lógica para actualizar un usuario existente.
    //   return { userInfo: action.payload };
    // },
    // userDelete: (state, action) => {
    //   // Lógica para eliminar un usuario del estado.
    //   return { userInfo: action.payload };
    // },
    // userList: (state, action) => {
    //   // Lógica para listar los usuarios existentes.
    //   return { userInfo: action.payload };
    // },
    // userSolo: (state, action) => {
    //   // Lógica para listar un solo usuario.
    //   return { userInfo: action.payload };
    // },
  },
});

// export const {
//   userLogout,
//   userLogin,
//   userRegister,
//   userUpdate,
//   userDelete,
//   userList,
//   userSolo,
// } = userSlice.actions;
export default userSlice.reducer;
