import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function JarDisplay({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/7017/7017517.png"
        alt="Memory Jar"
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
        className="w-32 h-32 mb-4"
      />
      <motion.p
        className="text-lg font-medium text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Dropped into the jar 💌 See you in the future!
      </motion.p>
    </div>
  );
}
