import React, { useState , useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [activeField, setActiveField] = useState("");

  const { isAuthenticated, login } = useAuth(); // Get auth functions
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateField = (name, value, currentFormData) => {
    switch (name) {
      case "fullName":
        if (!value) return "Full Name is required";
        break;
      case "email":
        if (!value) return "Email is required";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(value))
          return "Only valid Gmail addresses are allowed";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== currentFormData.password) return "Passwords do not match";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Validate the current field as the user types
    const error = validateField(name, value, newFormData);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    

    // If the user changes the password, re-validate confirmPassword
    if (name === "password" && newFormData.confirmPassword) {
      const confirmError = validateField(
        "confirmPassword",
        newFormData.confirmPassword,
        newFormData
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmError,
      }));
    }

    // If the user changes confirm password, re-validate it against the current password
    if (name === "confirmPassword") {
      const confirmError = validateField("confirmPassword", value, newFormData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleBlur = (e) => {
    // When the user leaves a field, run validation for that field one last time
    const { name, value } = e.target;
    const error = validateField(name, value, formData);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setActiveField(""); // Deactivate field on blur
  };

  const handleFocus = (e) => {
    setActiveField(e.target.name);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    // Re-validate all fields on submit to catch any untouched empty fields
    Object.keys(formData).forEach((name) => {
      const error = validateField(name, formData[name], formData);
      if (error) {
        validationErrors[name] = error;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      toast.success("Form Submitted Successfully!");
      login();
      navigate('/');
      console.log("Form Data:", formData);
    } else {
      toast.error("Please provide valid credentials.");
    }
  };

  // Helper to apply dynamic styles based on image
  const inputClassName = (fieldName) =>
    `w-full text-gray-800 bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 ${
      errors[fieldName] ? "border-red-500 ring-red-300" : ""
    }`;

  return (
    <>
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
      <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-gray-600">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-7 text-[#1D2B4F]">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-600 font-semibold text-sm mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={inputClassName("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>


            {/* Email Address */}
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
                onFocus={handleFocus}
                className={inputClassName("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>


            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={inputClassName("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>


            {/*Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 text-sm font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={inputClassName("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          {/* Link to Login Page */}
          <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
