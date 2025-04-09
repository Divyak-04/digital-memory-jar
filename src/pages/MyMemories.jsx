import React, { useEffect, useState } from 'react';

export default function MyMemories() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('memories') || '[]');

    // Filter only unlocked memories
    const now = new Date();
    const unlocked = all.filter(
      (memory) => new Date(memory.lockedUntil) <= now
    );

    // Sort newest first
    unlocked.sort((a, b) => new Date(b.lockedUntil) - new Date(a.lockedUntil));

    setMemories(unlocked);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6">📖 My Unlocked Memories</h2>

      {memories.length === 0 ? (
        <p className="text-center text-gray-500">No memories unlocked yet. Come back later ⏳</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <div
              key={index}
              className={`border-2 rounded-2xl p-4 shadow-md transition-all hover:scale-105 ${
                moodColor(memory.mood)
              }`}
            >
              <h3 className="text-lg font-semibold">
                {memory.emoji} {memory.mood}
              </h3>
              <p className="mt-2 text-sm text-gray-700">{memory.text}</p>
              <p className="text-xs text-gray-400 mt-4">Unlocked on: {new Date(memory.lockedUntil).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Mood color utility
function moodColor(mood) {
  switch (mood) {
    case 'Happy': return 'bg-yellow-100 border-yellow-300';
    case 'Sad': return 'bg-blue-100 border-blue-300';
    case 'Love': return 'bg-red-100 border-red-300';
    case 'Grateful': return 'bg-green-100 border-green-300';
    case 'Angry': return 'bg-gray-100 border-gray-400';
    case 'Dreamy': return 'bg-purple-100 border-purple-300';
    default: return 'bg-white border-gray-200';
  }
}
