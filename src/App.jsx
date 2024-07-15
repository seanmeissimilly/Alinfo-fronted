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
import Reports from "./components/Reports.jsx";
import Documents from "./components/Documents.jsx";
import Apps from "./components/Apps.jsx";
import Multimedia from "./components/Multimedia.jsx";
import Suggestions from "./components/Suggestions.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/forum" exact element={<Forum />} />
          <Route path="/miPerfil" element={<MiPerfil />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/multimedia" element={<Multimedia />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "editor"]} />} //todo:solo se puede acceder con rol de editor o admin
          >
            <Route path="/addBlog" element={<AddBlog />} />
          </Route>
          <Route path="/soloBlog/:id" element={<SoloBlog />} />
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "editor"]} />} //todo:solo se puede acceder con rol de editor o admin
          >
            <Route path="/editBlog/:id" element={<EditBlog />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={["admin", "editor"]} />} //todo:solo se puede acceder con rol de editor o admin
          >
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["admin"]} />} //todo:solo se puede acceder con rol de admin
          >
            <Route path="/configuration" element={<Configuration />} />
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
