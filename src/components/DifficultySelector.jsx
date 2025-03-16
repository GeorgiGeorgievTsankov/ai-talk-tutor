import React from 'react';
import { Brain } from 'lucide-react';

export const DifficultySelector = ({ difficulty, onChange }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <select
        value={difficulty}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  );
};