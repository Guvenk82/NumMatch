import React, { useState, useEffect } from 'react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-500 flex items-center justify-center p-5">
          <div className="text-white text-center bg-red-600 p-8 rounded-2xl">
            <h1 className="text-2xl font-bold mb-4">Hata Oluştu</h1>
            <p className="mb-4">{this.state.error?.message || 'Bilinmeyen hata'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-red-600 rounded-lg font-bold"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Import components
import StartScreen from './components/StartScreen';
import Game from './components/Game';

function App() {
  const [showGame, setShowGame] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('App mounted');
  }, []);

  const handleStartGame = (shouldReset) => {
    try {
      console.log('Starting game, reset:', shouldReset);
      setResetGame(shouldReset);
      setShowGame(true);
    } catch (err) {
      console.error('Start game error:', err);
      setError(err.message);
    }
  };

  const handleMenu = () => {
    try {
      console.log('Returning to menu');
      setShowGame(false);
    } catch (err) {
      console.error('Menu error:', err);
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center p-5">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Hata</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-5">
        {!showGame ? (
          <StartScreen onStartGame={handleStartGame} />
        ) : (
          <Game onMenu={handleMenu} resetGame={resetGame} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
