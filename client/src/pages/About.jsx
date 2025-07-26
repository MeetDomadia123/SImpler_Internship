import React from "react";
import { Link } from "react-router-dom"; // Fixed: Import Link component

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            About This Internship Project
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Welcome to the Simpler Internship Frontend Task! This project
            showcases clean, modern UI components, a smooth user experience, and
            good coding practices with React and Tailwind CSS.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 space-y-6 transition-colors duration-300">
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Who Am I?
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              {/* Remember to replace this with your actual name */}
              Hi, I’m{" "}
              <span className="font-bold text-blue-700 dark:text-blue-400">
                [Your Name]
              </span>
              , a developer passionate about building user-friendly web
              applications. This internship task gave me a chance to demonstrate
              my skills in modern frontend technologies while focusing on
              usability and responsiveness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Tech Stack Used
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 pl-2">
              <li>React (Functional Components, Hooks, Context API)</li>
              <li>Tailwind CSS for Rapid and Clean Styling</li>
              <li>React Router for Declarative Navigation</li>
              <li>React Icons for Crisp SVG Icons</li>
              <li>React Toastify for User Notifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Project Features
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 pl-2">
              <li>Authentication Flow with Protected Routes</li>
              <li>Modern Sign Up & Login Pages with Real-time Validation</li>
              <li>A Reusable and Responsive `UserCard` Component</li>
              <li>An Accessible, Animated Contact Form</li>
              <li>Full support for Dark & Light Mode</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              What I Learned
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              This project strengthened my skills in React component
              architecture, state management with hooks, and responsive design
              with a utility-first framework. I learned to focus deeply on user
              experience, not just functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Get In Touch
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              {/* Fixed: Simplified the Link */}
              Want to connect or have questions about the project? Please use
              the{" "}
              <Link
                to="/contact"
                className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
