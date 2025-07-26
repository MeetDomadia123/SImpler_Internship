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
const SignUpPageLayout = () => 
    (
  <div className="relative pt-0">
    <SignUp />
  </div>
);
const LoginPageLayout = () => (
    <div className="relative pt-0">
        <Login />
    </div>
)

function App() {
  return (
    // The AuthProvider wraps the entire application, making the authentication
    // state (isAuthenticated, login, logout) available to all components inside it.
    <AuthProvider>
      {/* BrowserRouter is aliased as Router and handles the routing logic. */}
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

          {/* This <main> tag holds the content for each page. */}
          {/* The top padding (pt-24) prevents content from being hidden by the fixed Navbar. */}
          <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              {/* --- PUBLIC ROUTE --- */}
              {/* The user can always access this page. */}
              <Route path="/signup" element={<SignUpPageLayout />} />
              <Route path="/login" element={<LoginPageLayout />} />{

              }

              {/* --- PROTECTED ROUTES --- */}
              {/* The user must be authenticated to access these pages. */}
              {/* If not authenticated, the <ProtectedRoute> will redirect them to "/signup". */}
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

              {/* --- CATCH-ALL REDIRECT --- */}
              {/* If a user tries to access any other path, they will be redirected to the homepage. */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
