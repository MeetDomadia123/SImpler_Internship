import React from "react";

const UserCard = ({ name, email }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 w-full max-w-xs mx-auto">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-4 border-4 border-white shadow-sm">
        {initials}
      </div>

      {/* User Info */}
      <h3 className="text-xl font-bold text-gray-800">{name}</h3>
      <p className="text-gray-500">{email}</p>
    </div>
  );
};

export default UserCard;
