import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  // 1. Simplified state: only email and password are needed.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { isAuthenticated, login } = useAuth(); // Get auth functions
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // 2. Simplified validation for just login fields.
  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        // Optional: you might remove the gmail check for login
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(value)) return "Please enter a valid Gmail address";
        break;
      case "password":
        if (!value) return "Password is required";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error as the user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    
    // We must validate both fields on submit
    Object.keys(formData).forEach(name => {
        const error = validateField(name, formData[name]);
        if(error) {
            validationErrors[name] = error;
        }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // NOTE: In a real app, you would verify credentials against a database here.
      // For this example, we'll just log the user in if the fields are valid.
      toast.success("Logged In Successfully!");
      login(); // Call login from context
      navigate("/"); // Redirect to home
    } else {
      toast.error("Please provide valid credentials.");
    }
  };

  const inputClassName = (fieldName) =>
    `w-full text-gray-800 bg-white border rounded-md py-2 px-3 focus:outline-none transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 ${
      errors[fieldName] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="bg-gray-600 min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          {/* 3. Updated UI text */}
          <h2 className="text-2xl font-bold text-center mb-7 text-[#1D2B4F]">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Email Address Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Gmail address"
                value={formData.email}
                onChange={handleChange}
                className={inputClassName("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={inputClassName("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          </form>

          {/* 4. Link to Sign-Up Page */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;