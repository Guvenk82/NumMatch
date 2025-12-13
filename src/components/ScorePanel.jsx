import React from 'react';
import { formatNumber } from '../utils/gameLogic';

export default function ScorePanel({ score, bestScore, nextNumber }) {
  return (
    <div className="flex justify-around gap-4 mt-4 flex-wrap">
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-5 py-4 rounded-xl font-bold text-sm shadow-lg">
        <div className="text-xs opacity-90">Skor</div>
        <div className="text-2xl mt-1 text-shadow-lg">{formatNumber(score)}</div>
      </div>
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-5 py-4 rounded-xl font-bold text-sm shadow-lg">
        <div className="text-xs opacity-90">En Yüksek</div>
        <div className="text-2xl mt-1 text-shadow-lg">{formatNumber(bestScore)}</div>
      </div>
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-5 py-4 rounded-xl font-bold text-sm shadow-lg">
        <div className="text-xs opacity-90">Sonraki</div>
        <div className="text-2xl mt-1 text-shadow-lg">{formatNumber(nextNumber)}</div>
      </div>
    </div>
  );
}

