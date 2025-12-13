import React from 'react';
import { formatNumber, loadBestScore } from '../utils/gameLogic';

export default function StartScreen({ onStartGame }) {
  const [bestScore, setBestScore] = React.useState(0);
  const [showDialog, setShowDialog] = React.useState(false);

  React.useEffect(() => {
    setBestScore(loadBestScore());
  }, []);

  const handleStartClick = () => {
    try {
      const savedGrid = localStorage.getItem('numMatchGrid');
      const hasSavedGame = savedGrid && JSON.parse(savedGrid).some(row => row.some(cell => cell !== null));
      
      if (hasSavedGame) {
        setShowDialog(true);
      } else {
        onStartGame(false);
      }
    } catch (error) {
      console.error('Error checking saved game:', error);
      onStartGame(false);
    }
  };

  const handleContinue = () => {
    setShowDialog(false);
    onStartGame(false);
  };

  const handleRestart = () => {
    setShowDialog(false);
    onStartGame(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center z-50 animate-fade-in">
        <div className="text-center bg-white/95 p-12 rounded-3xl shadow-2xl max-w-md w-[90%] animate-slide-in">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent mb-8 text-shadow">
            NumMatch <span className="text-2xl text-gray-500">v0.2</span>
          </h1>
          <div className="my-8 p-5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl text-white">
            <div className="text-base opacity-90 mb-2">En Yüksek Skor</div>
            <div className="text-4xl font-bold text-shadow-lg">{formatNumber(bestScore)}</div>
          </div>
          <p className="text-xl text-primary-500 font-bold my-8 italic">Daha iyisini yapabilir misin?</p>
          <button
            onClick={handleStartClick}
            className="px-12 py-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 mt-5"
          >
            Oyuna Başla
          </button>
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] animate-fade-in">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-[90%] text-center animate-slide-in">
            <h2 className="text-primary-500 mb-4 text-3xl font-bold">Oyun Devam Ediyor</h2>
            <p className="text-gray-600 mb-6 text-lg">Kaydedilmiş bir oyununuz var. Ne yapmak istersiniz?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleContinue}
                className="flex-1 max-w-[150px] px-8 py-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Devam Et
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 max-w-[150px] px-8 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Baştan Başla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

