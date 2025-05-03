import React, { useState, useRef } from "react";

interface GameScreenProps {
  category: string;
  onBack: () => void;
  soundOn: boolean;
  toggleSound: () => void;
}

const EASY_QUESTIONS = [
  {
    sentence: "She brushed her _____ before going to bed.",
    options: ["hands", "shoes", "teeth", "toys"],
    answer: "teeth"
  },
  {
    sentence: "The cow gives us _____.",
    options: ["juice", "milk", "water", "soda"],
    answer: "milk"
  },
  {
    sentence: "We wear _____ on our feet.",
    options: ["gloves", "hats", "shoes", "shirts"],
    answer: "shoes"
  },
  {
    sentence: "The opposite of big is _____.",
    options: ["tall", "small", "long", "wide"],
    answer: "small"
  },
  {
    sentence: "You can see with your _____.",
    options: ["hands", "eyes", "ears", "legs"],
    answer: "eyes"
  },
  {
    sentence: "The sky is _____ in color.",
    options: ["green", "blue", "red", "yellow"],
    answer: "blue"
  },
  {
    sentence: "A _____ barks.",
    options: ["cat", "dog", "cow", "duck"],
    answer: "dog"
  },
  {
    sentence: "Which one is sweet?",
    options: ["rice", "candy", "bread", "soup"],
    answer: "candy"
  },
  {
    sentence: "We sit on a _____.",
    options: ["table", "chair", "pillow", "bed"],
    answer: "chair"
  },
  {
    sentence: "The opposite of happy is _____.",
    options: ["excited", "sad", "funny", "tired"],
    answer: "sad"
  }
];

const MEDIUM_QUESTIONS = [
  {
    sentence: "The sun sets in the _____.",
    options: ["north", "south", "east", "west"],
    answer: "west"
  },
  {
    sentence: "Which word means 'very big'?",
    options: ["tiny", "huge", "narrow", "soft"],
    answer: "huge"
  },
  {
    sentence: "Choose the synonym of 'happy'.",
    options: ["angry", "excited", "joyful", "tired"],
    answer: "joyful"
  },
  {
    sentence: "Which one is used to write on a blackboard?",
    options: ["pencil", "crayon", "chalk", "pen"],
    answer: "chalk"
  },
  {
    sentence: "Which word best completes the sentence: 'He ran very _____ to catch the bus.'",
    options: ["slowly", "quickly", "quietly", "happily"],
    answer: "quickly"
  },
  {
    sentence: "What is the opposite of 'begin'?",
    options: ["open", "close", "finish", "stop"],
    answer: "finish"
  },
  {
    sentence: "What do bees collect from flowers?",
    options: ["honey", "nectar", "pollen", "leaves"],
    answer: "nectar"
  },
  {
    sentence: "Which word describes a sound made by lions?",
    options: ["chirp", "meow", "roar", "moo"],
    answer: "roar"
  },
  {
    sentence: "Which word fits best: 'The soup was too _____ to eat.'",
    options: ["cold", "spicy", "hot", "sweet"],
    answer: "hot"
  },
  {
    sentence: "What is a baby dog called?",
    options: ["kitten", "foal", "puppy", "cub"],
    answer: "puppy"
  }
];

const COMPLEX_QUESTIONS = [
  {
    sentence: "The _____ of the story was unexpected.",
    options: ["beginning", "middle", "ending", "plot"],
    answer: "ending"
  },
  {
    sentence: "Which word is a synonym for 'difficult'?",
    options: ["easy", "simple", "challenging", "basic"],
    answer: "challenging"
  },
  {
    sentence: "The _____ of the mountain was covered in snow.",
    options: ["bottom", "side", "top", "middle"],
    answer: "top"
  },
  {
    sentence: "Which word best completes: 'She was _____ to see her friend after many years.'",
    options: ["sad", "angry", "excited", "tired"],
    answer: "excited"
  },
  {
    sentence: "What is the opposite of 'expensive'?",
    options: ["costly", "cheap", "valuable", "precious"],
    answer: "cheap"
  },
  {
    sentence: "Which word describes a person who tells the truth?",
    options: ["liar", "honest", "dishonest", "deceitful"],
    answer: "honest"
  },
  {
    sentence: "The _____ of the book was very interesting.",
    options: ["cover", "title", "author", "story"],
    answer: "story"
  },
  {
    sentence: "Which word means 'to make something better'?",
    options: ["worsen", "improve", "damage", "break"],
    answer: "improve"
  },
  {
    sentence: "The _____ of the day is when the sun is highest in the sky.",
    options: ["morning", "evening", "night", "noon"],
    answer: "noon"
  },
  {
    sentence: "Which word best completes: 'The weather was _____ today.'",
    options: ["yesterday", "tomorrow", "beautiful", "last week"],
    answer: "beautiful"
  }
];

const GameScreen: React.FC<GameScreenProps> = ({ category, onBack, soundOn, toggleSound }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const successAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);

  const questions = difficulty === 'Medium' ? MEDIUM_QUESTIONS : difficulty === 'Complex' ? COMPLEX_QUESTIONS : EASY_QUESTIONS;
  const total = questions.length;
  const level = difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 2 : 3;

  const handleOptionClick = (option: string) => {
    if (selected || showNext) return;
    setSelected(option);
    if (option === questions[current].answer) {
      setFeedback("correct");
      setScore(score + 1);
      successAudioRef.current?.play();
    } else {
      setFeedback("incorrect");
      wrongAudioRef.current?.play();
    }
    setShowNext(true);
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setFeedback(null);
      setShowNext(false);
    } else {
      setFeedback(null);
      setShowNext(false);
    }
  };

  const getBgClass = () => {
    return "bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200";
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${getBgClass()} p-4 font-['Comic_Sans_MS','Comic_Sans',cursive,'Baloo_2','Fredoka_One',sans-serif] relative`}>
      <audio ref={successAudioRef} src="/sounds/success_bell.mp3" style={{ display: 'none' }} />
      <audio ref={wrongAudioRef} src="/sounds/wrong-bell.mp3" style={{ display: 'none' }} />
      <h2 className="text-3xl md:text-5xl font-bold text-green-700 mb-0 drop-shadow text-center">FIND THE MISSING WORD</h2>
      <div className="flex justify-between items-center w-full mb-4 text-lg md:text-xl font-semibold text-green-900">
        <div className="absolute top-4 left-4">
          <label htmlFor="difficulty" className="mr-2">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Complex">Complex</option>
          </select>
        </div>
        <span className="absolute top-4 left-1/2 transform -translate-x-1/2">Level: {level}</span>
        <span className="absolute top-4 right-4">Score: {score}</span>
      </div>
      <div className="text-center mb-4">Q: {current + 1}/{total}</div>
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 mb-8 w-full max-w-md flex flex-col items-center border-4 border-green-200">
        {questions.length > 0 ? (
          <>
            <div className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">
              {questions[current].sentence.replace(questions[current].answer, "_____")}
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mb-4">
              {questions[current].options.map((option) => (
                <button
                  key={option}
                  className={`px-4 py-3 rounded-xl text-lg font-semibold shadow-md border-2 transition-all flex items-center justify-center gap-2
                    ${selected === option
                      ? option === questions[current].answer
                        ? 'bg-green-300 border-green-600 text-green-900 scale-105'
                        : 'bg-red-200 border-red-500 text-red-700 scale-105'
                      : 'bg-yellow-100 border-yellow-400 text-yellow-800 hover:bg-yellow-200 hover:scale-105'}
                    ${selected && selected !== option ? 'opacity-60' : ''}
                  `}
                  onClick={() => handleOptionClick(option)}
                  disabled={!!selected}
                >
                  {option}
                  {selected === option && feedback === "correct" && option === questions[current].answer && <span className="ml-2 text-green-700 text-2xl">✅</span>}
                  {selected === option && feedback === "incorrect" && <span className="ml-2 text-red-600 text-2xl">❌</span>}
                </button>
              ))}
            </div>
            {selected && (
              <div className={`text-xl font-bold mb-2 ${feedback === "correct" ? "text-green-700" : "text-red-600"}`}>
                {feedback === "correct" ? "✅ Correct!" : `❌ Oops! The answer is "${questions[current].answer}"`}
              </div>
            )}
            {showNext && (
              <button
                className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-8 py-3 rounded-full shadow-md text-lg font-semibold hover:scale-105 transition-transform mt-2"
                onClick={handleNext}
              >
                {current === total - 1 ? "Finish" : "Next"}
              </button>
            )}
          </>
        ) : (
          <div className="text-lg text-gray-700 mb-4">Game content for <span className="font-semibold">{category}</span> will appear here!</div>
        )}
      </div>
      <button
        className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white px-6 py-3 rounded-full shadow-md text-lg font-semibold hover:scale-105 transition-transform"
        onClick={onBack}
      >
        ⬅️ Back to Categories
      </button>
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

export default GameScreen;