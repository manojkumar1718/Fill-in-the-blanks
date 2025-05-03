import React, { useState, useRef } from "react";

const CATEGORY_LIST = [
  "Vocabulary Practice",
  "Grammar Challenge",
  "Synonyms & Antonyms",
  "Fill in the Blanks (General)",
  "Action Words (Verbs)",
  "Articles in Action (a, an, the)",
  "Idioms & Phrases",
  "Rhyming Words",
  "Prefixes & Suffixes",
  "Dialogue Completion"
];

const VOCABULARY_TOPICS = [
  "Animals and Their Sounds",
  "Fruits and Vegetables",
  "Everyday Objects",
  "Food and Drinks",
  "Actions / Verbs",
  "Opposites (Antonyms)",
  "Synonyms (Similar Words)",
  "People and Professions",
  "Weather Words",
  "Clothes and Accessories",
  "Transport and Vehicles",
  "Emotions and Feelings",
  "School and Stationery",
  "Body Parts",
  "Colors and Shapes",
  "Days, Months & Time Words",
  "Family and Relationships",
  "Places Around Us",
  "Nature and Seasons",
  "Describing Words (Adjectives)"
];

const DIFFICULTY_LEVELS = ["Easy", "Medium", "Complex"];

interface CategorySelectionScreenProps {
  onSelect: (category: string, topic: string, difficulty: string, customTopic: string) => void;
  soundOn: boolean;
  toggleSound: () => void;
}

const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({ onSelect, soundOn, toggleSound }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const showTopicDropdown = selectedCategory === "Vocabulary Practice";

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setTimeout(() => {
        onSelect(selectedCategory, selectedTopic, selectedDifficulty, customTopic);
      }, 300);
    } else {
      onSelect(selectedCategory, selectedTopic, selectedDifficulty, customTopic);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200 p-4 font-['Comic_Sans_MS','Comic_Sans',cursive,'Baloo_2','Fredoka_One',sans-serif] relative">
      <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-6 text-center drop-shadow" style={{fontFamily: "'Comic Sans MS','Comic Sans',cursive,'Baloo 2','Fredoka One',sans-serif"}}>FIND THE MISSING WORD</h2>
      <div className="w-full max-w-lg flex flex-col items-center gap-4">
        <div className="w-full">
          <label className="block text-lg font-semibold text-blue-800 mb-2">Choose a Category:</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            value={selectedCategory}
            onChange={e => {
              setSelectedCategory(e.target.value);
              setSelectedTopic("");
            }}
          >
            <option value="" disabled>Select category...</option>
            {CATEGORY_LIST.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {showTopicDropdown && (
          <div className="w-full">
            <label className="block text-lg font-semibold text-blue-800 mb-2">Select a Topic:</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              value={selectedTopic}
              onChange={e => setSelectedTopic(e.target.value)}
            >
              <option value="" disabled>Select topic...</option>
              {VOCABULARY_TOPICS.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        )}
        <div className="w-full">
          <label className="block text-lg font-semibold text-blue-800 mb-2">Difficulty Level:</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
          >
            <option value="" disabled>Select difficulty...</option>
            {DIFFICULTY_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label className="block text-lg font-semibold text-blue-800 mb-2">Custom Topic (optional):</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            placeholder="Enter your own topic..."
            value={customTopic}
            onChange={e => setCustomTopic(e.target.value)}
          />
        </div>
        <button
          className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-8 py-4 rounded-xl shadow-md text-2xl font-semibold hover:scale-105 transition-transform w-full disabled:opacity-50 mt-2"
          onClick={handleStart}
          disabled={!selectedCategory || !selectedDifficulty || (showTopicDropdown && !selectedTopic)}
        >
          Start Game
        </button>
        <audio ref={audioRef} src="/sounds/gamestart.mp3" style={{ display: 'none' }} />
      </div>
      <button
        className="sound-toggle"
        aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}
        onClick={toggleSound}
        style={{position:'absolute',bottom:24,right:24,background:'rgba(255,255,255,0.8)',borderRadius:'50%',padding:'0.75rem',boxShadow:'0 2px 8px rgba(0,0,0,0.15)',border:'none',cursor:'pointer',zIndex:10}}
      >
        {soundOn ? (
          <span role="img" aria-label="Sound on" style={{fontSize:'2rem'}}>🔊</span>
        ) : (
          <span role="img" aria-label="Sound off" style={{fontSize:'2rem'}}>🔇</span>
        )}
      </button>
    </div>
  );
};

export default CategorySelectionScreen;