import React from 'react';
import { Brain } from 'lucide-react';

export const DifficultySelector = ({ difficulty, onChange }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <Brain className="w-6 h-6 text-purple-500" />
      <select
        value={difficulty}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="beginner">Начинаещ</option>
        <option value="intermediate">Средно ниво</option>
        <option value="advanced">Напреднал</option>
      </select>
    </div>
  );
};