import React, { useState, useRef, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import './App.css';

function App() {
  const [screen, setScreen] = useState<"start" | "game">("start");
  const [soundOn, setSoundOn] = useState(true);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    setAudioReady(true);
  }, []);

  useEffect(() => {
    if (audioReady) {
      if (soundOn) {
        // Play sound if needed
      } else {
        // Pause sound if needed
      }
    }
  }, [soundOn, audioReady]);

  const toggleSound = () => setSoundOn((prev) => !prev);

  return (
    <>
      {screen === "start" && (
        <StartScreen onStart={() => setScreen("game")} soundOn={soundOn} toggleSound={toggleSound} />
      )}
      {screen === "game" && (
        <GameScreen
          category={""}
          onBack={() => setScreen("start")}
          soundOn={soundOn}
          toggleSound={toggleSound}
        />
      )}
    </>
  );
}

export default App;
