import React from "react";

export const DifficultySelector = ({ difficulty, onChange }) => {
  return (
    <div className="w-full bg-gray-200 sm:w-auto flex items-center  sm:p-4 ">
      <select
        value={difficulty}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-auto bg-gray-100 border-gray-500 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  );
};
