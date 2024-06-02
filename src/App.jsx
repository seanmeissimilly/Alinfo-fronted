import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Components
import Landing from "./components/Landing";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import MiPerfil from "./components/MiPerfil.jsx";
import Forum from "./components/Forum.jsx";
import UserProfile from "./components/UserProfile.jsx";
import AddBlog from "./components/AddBlog.jsx";
import SoloBlog from "./components/SoloBlog.jsx";
import EditBlog from "./components/EditBlog.jsx";
import EditProfile from "./components/EditProfile.jsx";
import Configuration from "./components/Configuration.jsx";
import HomePage from "./components/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
        //Rutas de la aplicacion
          <Route path="/" exact element={<HomePage />} />
          <Route path="/forum" exact element={<Forum />} />
          <Route path="/miPerfil" element={<MiPerfil />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/soloBlog/:id" element={<SoloBlog />} />
          <Route path="/editBlog/:id" element={<EditBlog />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/configuration" element={<Configuration />} />
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
