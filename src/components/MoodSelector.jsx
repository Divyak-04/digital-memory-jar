// src/components/MoodSelector.jsx
import React from 'react';

const moods = [
  { name: 'Happy', color: 'bg-yellow-300', emoji: '💛' },
  { name: 'Sad', color: 'bg-blue-300', emoji: '💙' },
  { name: 'Love', color: 'bg-red-300', emoji: '❤️' },
  { name: 'Grateful', color: 'bg-green-300', emoji: '💚' },
  { name: 'Angry', color: 'bg-gray-600', emoji: '🖤' },
  { name: 'Dreamy', color: 'bg-purple-300', emoji: '💜' },
];

export default function MoodSelector({ onSelectMood }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {moods.map((mood) => (
        <button
          key={mood.name}
          onClick={() => onSelectMood(mood)}
          className={`${mood.color} rounded-2xl p-4 shadow-md hover:scale-105 transition-transform`}
        >
          <span className="text-2xl">{mood.emoji}</span>
          <div className="text-lg font-semibold">{mood.name}</div>
        </button>
      ))}
    </div>
  );
}
