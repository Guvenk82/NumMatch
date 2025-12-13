import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';

function App() {
  const [showGame, setShowGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
    console.log('App mounted');
  }, []);

  const handleStartGame = (shouldReset) => {
    console.log('Starting game, reset:', shouldReset);
    setResetGame(shouldReset);
    setShowGame(true);
  };

  const handleMenu = () => {
    console.log('Returning to menu');
    setShowGame(false);
  };

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-5">
        {!showGame ? (
          <StartScreen onStartGame={handleStartGame} />
        ) : (
          <Game onMenu={handleMenu} resetGame={resetGame} />
        )}
      </div>
    );
  } catch (error) {
    console.error('App render error:', error);
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center p-5">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Hata Oluştu</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }
}

export default App;

