// src/components/MemoryForm.jsx
import React, { useState } from 'react';

export default function MemoryForm({ mood, onBack }) {
  const [memoryText, setMemoryText] = useState('');
  const [lockDays, setLockDays] = useState(30);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const memory = {
      mood: mood.name,
      emoji: mood.emoji,
      text: memoryText,
      lockedUntil: new Date(Date.now() + lockDays * 24 * 60 * 60 * 1000), // future unlock
    };

    // Save to localStorage for now (we'll connect backend later)
    const stored = JSON.parse(localStorage.getItem('memories') || '[]');
    stored.push(memory);
    localStorage.setItem('memories', JSON.stringify(stored));

    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back to Mood Selection
      </button>

      <h2 className="text-2xl font-bold mb-2">
        {mood.emoji} Drop a {mood.name} Memory
      </h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <textarea
            className="w-full h-32 p-3 border rounded-xl focus:outline-none"
            placeholder="Write your memory here..."
            value={memoryText}
            onChange={(e) => setMemoryText(e.target.value)}
            required
          />

          <div className="flex flex-col items-start">
            <label className="mb-1 font-medium">Lock Duration (days)</label>
            <select
              className="p-2 rounded-xl border"
              value={lockDays}
              onChange={(e) => setLockDays(parseInt(e.target.value))}
            >
              <option value={7}>7 Days</option>
              <option value={15}>15 Days</option>
              <option value={30}>30 Days</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600 transition"
          >
            Drop into Jar
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <p className="text-xl font-medium text-green-600">
            ✅ Memory safely sealed in your {mood.name} jar!
          </p>
          <p className="text-sm mt-2">Come back in {lockDays} days to open it 🕰️</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 border rounded-xl text-blue-600 hover:bg-blue-50"
          >
            Add Another Memory
          </button>
        </div>
      )}
    </div>
  );
}
