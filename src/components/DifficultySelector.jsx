import React from "react";

export const DifficultySelector = ({ difficulty, onChange }) => {
  return (
    <div className="w-full  sm:w-auto flex items-center   ">
      <select
        value={difficulty}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-auto bg-gray-200 border border-gray-300 rounded-md px-1 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"

      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  );
};
