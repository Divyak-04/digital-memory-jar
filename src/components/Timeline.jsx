import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const moodColors = {
  happy: 'bg-yellow-100',
  sad: 'bg-blue-100',
  love: 'bg-red-100',
  grateful: 'bg-green-100',
  angry: 'bg-black text-white',
  dreamy: 'bg-purple-100',
};

export default function Timeline() {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`http://localhost:5000/api/memories?userId=${userId}`);
        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setMemories(sorted);
      } catch (err) {
        console.error('Failed to fetch memories', err);
      }
    };
    fetchMemories();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🕰️ Timeline of Your Memories</h2>
      
      <div className="space-y-4">
        {memories.map((memory) => {
          const isUnlocked = new Date() >= new Date(memory.lockedUntil);
          return (
            <motion.div
              key={memory._id}
              className={`p-4 rounded-lg shadow-md ${moodColors[memory.mood] || 'bg-gray-100'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold capitalize">{memory.mood} mood</span>
                <span className="text-sm text-gray-500">{new Date(memory.date).toLocaleDateString()}</span>
              </div>
              {isUnlocked ? (
                <p>{memory.text}</p>
              ) : (
                <p className="italic text-gray-600">🔒 Locked until {new Date(memory.lockedUntil).toLocaleDateString()}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
