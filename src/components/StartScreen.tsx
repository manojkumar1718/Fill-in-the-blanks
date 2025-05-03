import React, { useRef } from "react";
import './StartScreen.css';

interface StartScreenProps {
  onStart: () => void;
  soundOn: boolean;
  toggleSound: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, soundOn, toggleSound }) => {
  const selectSoundRef = useRef<HTMLAudioElement | null>(null);
  // Removed gameStartSoundRef and related logic
  
  const handleStartClick = () => {
    if (selectSoundRef.current && document.contains(selectSoundRef.current)) {
      selectSoundRef.current.currentTime = 0;
      selectSoundRef.current.play();
      setTimeout(() => {
        onStart();
      }, 300);
    } else {
      onStart();
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center start-screen-bg relative">
      <h1 className="text-5xl md:text-7xl font-extrabold text-black-500 drop-shadow mb-6 text-center tracking-wide rubik-lines-regular">VOCABULARY PRACTICE</h1>
      <p className="text-lg md:text-2xl text-white mb-8 text-center max-w-xl font-semibold" style={{fontFamily: "'Comic Sans MS','Comic Sans',cursive,'Baloo 2','Fredoka One',sans-serif"}}>Complete the sentence in a fun way! Choose the right word from exciting options.</p>
      <button
        className="text-black px-10 py-5 rounded-full text-2xl font-bold hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-300 mb-6"
        style={{ fontFamily: "'Comic Sans MS','Comic Sans',cursive,'Baloo 2','Fredoka One',sans-serif", display: 'inline-flex', alignItems: 'center' }}
        onClick={handleStartClick}
      >
        <span style={{ marginRight: '10px' }}>🎮</span> Start
      </button>
      <audio ref={selectSoundRef} src="/sounds/select-sound.mp3" preload="auto" />
      <p className="text-base md:text-lg text-white mt-2 text-center font-semibold" style={{fontFamily: "'Comic Sans MS','Comic Sans',cursive,'Baloo 2','Fredoka One',sans-serif"}}>Sharpen your English skills.</p>
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

export default StartScreen;