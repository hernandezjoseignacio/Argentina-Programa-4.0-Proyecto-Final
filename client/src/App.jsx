import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";
import { PostFormPage } from "./pages/PostFormPage";
import { Profile } from "./pages/Profile";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { PostProvider } from "./context/PostContext";

export const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/post" element={<PostPage />} />
              <Route path="/add-post" element={<PostFormPage />} />
              <Route path="/post/:id" element={<PostFormPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
};
