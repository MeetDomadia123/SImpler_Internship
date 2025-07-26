import React, { useState } from "react";

const UserCard = ({ name, email, onUpdate }) => {
  // --- STATE MANAGEMENT ---
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [editedName, setEditedName] = useState(name);

  const initials = currentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  // --- EVENT HANDLERS ---

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setCurrentName(editedName);
    if (onUpdate) {
      onUpdate(editedName);
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedName(currentName);
    setIsEditing(false);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  return (
    <div
      className="
      bg-white rounded-lg shadow-lg p-6 
      flex flex-col items-center text-center 
      transform hover:scale-105 transition-transform duration-300 
      w-full max-w-xs mx-auto
      dark:bg-gray-800 dark:shadow-blue-900/50
      cursor-alias
    "
    >
      {/* Avatar */}
      <div
        className="
        w-24 h-24 rounded-full bg-blue-500 text-white 
        flex items-center justify-center 
        text-3xl font-bold mb-4 
        border-4 border-white shadow-sm
        dark:bg-blue-600 dark:border-gray-700
      "
      >
        {initials}
      </div>

      {}
      {isEditing ? (
        // --- EDITING VIEW ---
        <div className="w-full">
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            className="w-full text-center border-2 border-blue-300 rounded-md py-1 px-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus 
          />
        </div>
      ) : (
        // --- DISPLAY VIEW ---
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {currentName}
        </h3>
      )}

      <p className="text-gray-500 dark:text-gray-400 mb-4">{email}</p>

      {/* --- CONDITIONAL BUTTONS: Show Edit or Save/Cancel --- */}
      {isEditing ? (
        // --- SAVE/CANCEL BUTTONS ---
        <div className="flex gap-x-2">
          <button
            onClick={handleSaveClick}
            className="bg-green-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            className="bg-gray-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        // --- EDIT BUTTON ---
        <button
          onClick={handleEditClick}
          className="bg-blue-500 text-white font-semibold py-1 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default UserCard;
