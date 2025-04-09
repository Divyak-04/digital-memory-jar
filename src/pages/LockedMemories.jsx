import React, { useEffect, useState } from 'react';

export default function LockedMemories() {
  const [locked, setLocked] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('memories') || '[]');
    const now = new Date();

    const lockedOnes = all.filter(
      (memory) => new Date(memory.lockedUntil) > now
    );

    // Sort by nearest unlock
    lockedOnes.sort((a, b) => new Date(a.lockedUntil) - new Date(b.lockedUntil));

    setLocked(lockedOnes);
  }, []);

  const formatCountdown = (targetDate) => {
    const now = new Date();
    const diff = new Date(targetDate) - now;

    if (diff <= 0) return "Unlocking soon...";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hrs}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🔒 Locked Memories</h2>

      {locked.length === 0 ? (
        <p className="text-center text-gray-500">No locked memories left! 🥳</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locked.map((memory, index) => (
            <div
              key={index}
              className={`border-2 rounded-2xl p-4 shadow-md bg-gray-100 border-gray-300`}
            >
              <h3 className="text-lg font-semibold mb-1">
                {memory.emoji} {memory.mood}
              </h3>
              <div className="h-24 overflow-hidden text-gray-400 italic blur-sm">
                {memory.text}
              </div>
              <p className="text-sm text-blue-600 mt-4">
                ⏳ Unlocks in: {formatCountdown(memory.lockedUntil)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
