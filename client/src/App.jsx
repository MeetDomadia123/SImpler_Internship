import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * A simple layout wrapper for the SignUp page to ensure it has the correct styling
 * (i.e., it doesn't have the main content padding).
 */
const SignUpPageLayout = () => (
  <div className="relative pt-0">
    <SignUp />
  </div>
);
const LoginPageLayout = () => (
  <div className="relative pt-0">
    <Login />
  </div>
);

function App() {
  return (
    // The AuthProvider wraps the entire app and provides auth state + loading
    <AuthProvider>
      <Router>
        <div className="bg-[#F6F8FA] min-h-screen font-sans">
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/signup" element={<SignUpPageLayout />} />
              <Route path="/login" element={<LoginPageLayout />} />

              {/* PROTECTED ROUTES */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <Contact />
                  </ProtectedRoute>
                }
              />

              {/* CATCH ALL - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
