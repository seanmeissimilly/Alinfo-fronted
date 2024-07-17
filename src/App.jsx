import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Landing from "./components/Landing";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import MiPerfil from "./components/MiPerfil";
import Forum from "./components/Forum";
import UserProfile from "./components/UserProfile";
import AddBlog from "./components/AddBlog";
import SoloBlog from "./components/SoloBlog";
import EditBlog from "./components/EditBlog";
import EditProfile from "./components/EditProfile";
import HomePage from "./components/HomePage";
import Reports from "./components/Reports";
import Documents from "./components/Documents";
import Apps from "./components/Apps";
import Multimedia from "./components/Multimedia";
import Suggestions from "./components/Suggestions";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/miPerfil" element={<MiPerfil />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/multimedia" element={<Multimedia />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/soloBlog/:id" element={<SoloBlog />} />
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "editor"]} />}
          >
            <Route path="/reports" element={<Reports />} />
            <Route path="/addBlog" element={<AddBlog />} />
            <Route path="/editBlog/:id" element={<EditBlog />} />
          </Route>
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
