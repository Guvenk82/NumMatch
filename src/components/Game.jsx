import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import GameBoard from './GameBoard';
import ScorePanel from './ScorePanel';

export default function Game({ onMenu, resetGame }) {
  const {
    grid,
    score,
    bestScore,
    nextNumber,
    isPaused,
    hammerCount,
    hammerMode,
    draggedCell,
    setDraggedCell,
    togglePause,
    performMove,
    handleHammerClick,
    activateHammerMode,
    resetGame: resetGameLogic,
  } = useGameLogic(resetGame);

  React.useEffect(() => {
    if (resetGame) {
      resetGameLogic();
    }
  }, [resetGame, resetGameLogic]);

  const handleMenuClick = () => {
    onMenu();
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white/98 rounded-3xl p-8 shadow-2xl max-w-2xl w-full backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-2.5 mb-4">
            <button
              onClick={togglePause}
              className={`px-5 py-2.5 rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center ${
                isPaused
                  ? 'bg-gradient-to-br from-cyan-400 to-cyan-500 text-white'
                  : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
              } hover:shadow-xl hover:-translate-y-0.5`}
            >
              {isPaused ? 'Devam Et' : 'Durdur'}
            </button>
            <button
              onClick={handleMenuClick}
              className="px-5 py-2.5 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center"
            >
              <span className="text-xl mr-1.5">🏠</span>
              Ana Menü
            </button>
          </div>
          <h1 className="text-primary-500 text-5xl mb-4 text-shadow">
            NumMatch <span className="text-base text-gray-500">v0.2</span>
          </h1>
          <ScorePanel score={score} bestScore={bestScore} nextNumber={nextNumber} />
        </div>

        <GameBoard
          grid={grid}
          performMove={performMove}
          handleHammerClick={handleHammerClick}
          hammerMode={hammerMode}
          draggedCell={draggedCell}
          setDraggedCell={setDraggedCell}
        />

        <div className="flex justify-center gap-5 mt-5 flex-wrap">
          <button
            onClick={activateHammerMode}
            disabled={hammerCount <= 0}
            className={`
              px-6 py-4 rounded-xl font-bold text-base
              transition-all flex flex-col items-center gap-2 min-w-[110px]
              ${hammerMode
                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl animate-pulse'
                : hammerCount <= 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg'
              }
              hover:shadow-xl hover:-translate-y-1 hover:scale-105
              disabled:hover:translate-y-0 disabled:hover:scale-100
            `}
          >
            <span className="text-3xl">🔨</span>
            <span className="text-sm">Çekiç</span>
            <span className="text-xs opacity-90">{hammerCount}</span>
          </button>
        </div>

        <div className="text-center text-gray-600 text-sm mt-4">
          <p>Sayıları sürükleyerek birleştirin ve toplayın!</p>
        </div>
      </div>
    </div>
  );
}

