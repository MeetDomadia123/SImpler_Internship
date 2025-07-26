import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { isAuthenticated, login } = useAuth(); // Get auth functions
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  //  Simplified validation for just login fields.
  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        // Regex to validate Gmail addresses
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(value))
          return "Please enter a valid Gmail address";
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

    // Validate the current field as the user types
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (e) => {
    // When the user leaves a field, run validation for that field one last time
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // We must validate both fields on submit
    Object.keys(formData).forEach((name) => {
      const error = validateField(name, formData[name]);
      if (error) {
        validationErrors[name] = error;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate an API call
      setTimeout(() => {
        setIsSubmitting(false);
        // For this example, we'll just log the user in if the fields are valid.
        toast.success("Logged In Successfully!");
        login(); // Call login from context
        navigate("/"); // Redirect to home
      }, 2000);
    } else {
      toast.error("Please provide valid credentials.");
    }
  };

  const getFieldStatus = (fieldName) => {
    if (errors[fieldName]) {
      return "invalid";
    }
    // Only mark as valid if the field has been touched and has a value
    if (formData[fieldName] && !errors[fieldName]) {
      return "valid";
    }
    return ""; // Neutral state
  };

  const inputClassName = (fieldName) => {
    const status = getFieldStatus(fieldName);
    return `w-full text-gray-800 bg-white border rounded-md py-2 px-3 focus:outline-none transition-all duration-300 ${
      status === "valid"
        ? "border-green-500 ring-green-300"
        : status === "invalid"
        ? "border-red-500 ring-red-300"
        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
    }`;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="bg-indigo-900 min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-7 text-[#1D2B4F]">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Gmail address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClassName("password")}
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
