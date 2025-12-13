import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';

function App() {
  const [showGame, setShowGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  const handleStartGame = (shouldReset) => {
    setResetGame(shouldReset);
    setShowGame(true);
  };

  const handleMenu = () => {
    setShowGame(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-5">
      {!showGame ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <Game onMenu={handleMenu} resetGame={resetGame} />
      )}
    </div>
  );
}

export default App;

