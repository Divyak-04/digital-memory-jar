import React, { useState } from 'react';
import MoodSelector from '../components/MoodSelector';
import MemoryForm from '../components/MemoryForm';
import JarDisplay from '../components/JarDisplay';
import Timeline from '../components/Timeline'; // ✅ Import Timeline page

export default function Home() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false); // ✅ Timeline toggle

  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-br from-pink-100 to-yellow-50">

      {/* ✅ Timeline view */}
      {showTimeline ? (
        <>
          <button
            className="mb-4 px-4 py-2 bg-pink-300 text-white rounded hover:bg-pink-400"
            onClick={() => setShowTimeline(false)}
          >
            ⬅️ Back to Home
          </button>
          <Timeline />
        </>
      ) : (
        <>
          {/* ✅ Show timeline button */}
          <div className="text-right mb-4">
            <button
              className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500"
              onClick={() => setShowTimeline(true)}
            >
              📅 View Timeline
            </button>
          </div>

          {!selectedMood && !submitted && (
            <MoodSelector onSelectMood={setSelectedMood} />
          )}

          {selectedMood && !submitted && (
            <MemoryForm
              mood={selectedMood}
              onBack={() => setSelectedMood(null)}
              onSubmit={() => setSubmitted(true)}
            />
          )}

          {submitted && (
            <JarDisplay onDone={() => {
              setSelectedMood(null);
              setSubmitted(false);
            }} />
          )}
        </>
      )}
    </div>
  );
}
