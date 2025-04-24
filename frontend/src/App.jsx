import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProfileProvider } from "./context/profileContext";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatHome from "./pages/ChatHome";
import Profile from "./components/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import { baseUrl } from "../apiConfig";

function App() {
  // Configure axios defaults
  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true;

  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/:id/verify/:token" element={<VerifyEmail />} />
            <Route
              path="/chathome"
              element={
                <ProtectedRoute>
                  <ChatHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster position="top-center" />
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
