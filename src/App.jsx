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
import Tools from "./components/Tools";
import Videos from "./components/Videos";
import Suggestions from "./components/Suggestions";
import ProtectedRoute from "./components/ProtectedRoute";
import DocumentForm from "./components/DocumentForm";
import VideoForm from "./components/VideoForm";
import ToolForm from "./components/ToolForm";
import SuggestionForm from "./components/SuggestionForm";
import Contact from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/forum" element={<Forum />} />
          <Route path="/miPerfil" element={<MiPerfil />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/soloBlog/:id" element={<SoloBlog />} />
          <Route path="/createSuggestion" element={<SuggestionForm />} />
          <Route path="/editSuggestion/:id" element={<SuggestionForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "editor"]} />}
          >
            <Route path="/reports" element={<Reports />} />
            <Route path="/addBlog" element={<AddBlog />} />
            <Route path="/editBlog/:id" element={<EditBlog />} />
            <Route path="/createDocument" element={<DocumentForm />} />
            <Route path="/editDocument/:id" element={<DocumentForm />} />
            <Route path="/createVideo" element={<VideoForm />} />
            <Route path="/editVideo/:id" element={<VideoForm />} />
            <Route path="/createTool" element={<ToolForm />} />
            <Route path="/editTool/:id" element={<ToolForm />} />
          </Route>
        </Route>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
