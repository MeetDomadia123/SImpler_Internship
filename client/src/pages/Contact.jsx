import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <>
      {/* ToastContainer aria-live is polite by default for screen readers */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900 min-h-screen pt-20">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 px-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We're here to help and answer any question you might have.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
            {/* CONTACT FORM */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Send a Message
              </h2>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-8"
                aria-label="Contact form"
              >
                {/* Floating Label Inputs */}
                {/** Name */}
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
                    placeholder="Full Name"
                    aria-required="true"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Full Name
                  </label>
                </div>
                {/** Email */}
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
                    placeholder="Email Address"
                    aria-required="true"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Email Address
                  </label>
                </div>
                {/** Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors resize-none"
                    placeholder="Your message..."
                    aria-required="true"
                    required
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Your message...
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-live="polite"
                  aria-disabled={isSubmitting}
                  className={`w-full rounded-lg font-bold py-3 px-6 text-white transition-transform duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:-translate-y-1 disabled:from-blue-400 disabled:to-indigo-400 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 transform`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Information cards */}
            <div className="space-y-6 pt-4">
              <InfoCard
                icon={<FaMapMarkerAlt />}
                title="Our Office"
                text="123 Innovation Drive, Tech City, USA"
              />
              <InfoCard
                icon={<FaEnvelope />}
                title="Email Us"
                text="contact@myapp.com"
              />
              <InfoCard
                icon={<FaPhone />}
                title="Call Us"
                text="(123) 456-7890"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// InfoCard helper component
const InfoCard = ({ icon, title, text }) => (
  <div className="flex items-start space-x-5 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
      <span className="text-2xl text-blue-600 dark:text-blue-400">{icon}</span>
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mt-1">{text}</p>
    </div>
  </div>
);

export default Contact;
