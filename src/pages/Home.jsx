import React, { useState } from 'react';
import MoodSelector from '../components/MoodSelector';
import MemoryForm from '../components/MemoryForm';
import JarDisplay from '../components/JarDisplay';

export default function Home() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-br from-pink-100 to-yellow-50">
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

      {submitted && <JarDisplay onDone={() => {
        setSelectedMood(null);
        setSubmitted(false);
      }} />}
    </div>
  );
}
