import { useState } from 'react';
import MoodSelector from './components/MoodSelector';
import MemoryForm from './components/MemoryForm';
import JarDisplay from './components/JarDisplay';
import MyMemories from './pages/MyMemories';
import LockedMemories from './pages/LockedMemories';
import Home from './pages/Home';

function App() {
  const [page, setPage] = useState('home');
  const [selectedMood, setSelectedMood] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white text-center">
      <nav className="p-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-xl font-bold text-indigo-600">🫙 Digital Memory Jar</h1>
        <div className="space-x-4">
          <button
            onClick={() => {
              setPage('home');
              setSelectedMood(null);
              setSubmitted(false);
            }}
            className="text-sm text-indigo-600"
          >
            Home
          </button>
          <button
            onClick={() => setPage('memories')}
            className="text-sm text-indigo-600"
          >
            My Memories
          </button>
          <button
            onClick={() => setPage('locked')}
            className="text-sm text-indigo-600"
          >
            Locked
          </button>
        </div>
      </nav>

      <main className="p-6">
        {page === 'home' && !selectedMood && !submitted && (
          <MoodSelector onSelectMood={setSelectedMood} />
        )}

        {page === 'home' && selectedMood && !submitted && (
          <MemoryForm
            mood={selectedMood}
            onBack={() => setSelectedMood(null)}
            onSubmit={() => setSubmitted(true)}
          />
        )}

        {page === 'home' && submitted && (
          <JarDisplay
            onDone={() => {
              setSelectedMood(null);
              setSubmitted(false);
            }}
          />
        )}

        {page === 'memories' && <MyMemories />}
        {page === 'locked' && <LockedMemories />}
      </main>

      <footer className="text-sm text-gray-500 py-4">
        Made with 💖 by Divya
      </footer>
    </div>
  );
}

export default App;
