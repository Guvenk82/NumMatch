// Game utility functions
export const GRID_SIZE = 4;
export const SPAWN_DELAY = 1800; // 1.8 seconds

export function formatNumber(num) {
  if (num >= 16384) {
    return (num / 1024).toFixed(0) + 'k';
  }
  return num.toString();
}

export function getNumberColor(value) {
  const colors = {
    1: { bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)', text: '#fff' },
    2: { bg: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)', text: '#fff' },
    4: { bg: 'linear-gradient(135deg, #ffe66d 0%, #ffd93d 100%)', text: '#333' },
    8: { bg: 'linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%)', text: '#333' },
    16: { bg: 'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)', text: '#fff' },
    32: { bg: 'linear-gradient(135deg, #54a0ff 0%, #2e86de 100%)', text: '#fff' },
    64: { bg: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)', text: '#fff' },
    128: { bg: 'linear-gradient(135deg, #00d2d3 0%, #01a3a4 100%)', text: '#fff' },
    256: { bg: 'linear-gradient(135deg, #ff6348 0%, #ff4757 100%)', text: '#fff' },
    512: { bg: 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)', text: '#fff' },
    1024: { bg: 'linear-gradient(135deg, #ffd32a 0%, #ffa502 100%)', text: '#333' },
    2048: { bg: 'linear-gradient(135deg, #ff6b81 0%, #ff4757 100%)', text: '#fff' },
    4096: { bg: 'linear-gradient(135deg, #a55eea 0%, #8854d0 100%)', text: '#fff' },
    8192: { bg: 'linear-gradient(135deg, #26de81 0%, #20bf6b 100%)', text: '#fff' },
  };
  
  if (value > 8192) {
    const intensity = Math.min(0.7 + (value / 100000) * 0.3, 1);
    return {
      bg: `linear-gradient(135deg, rgba(102, 51, 153, ${intensity}) 0%, rgba(51, 25, 77, ${intensity}) 100%)`,
      text: '#fff'
    };
  }
  
  return colors[value] || { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#fff' };
}

export function getMaxValue(grid) {
  let max = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] !== null && grid[row][col] > max) {
        max = grid[row][col];
      }
    }
  }
  return max;
}

export function calculateNextNumber(grid) {
  const maxValue = getMaxValue(grid);
  
  if (maxValue < 64) {
    return 1;
  }
  
  const multiplier = Math.floor(Math.log2(maxValue / 64)) + 1;
  return Math.pow(2, multiplier);
}

export function calculateTotalScore(grid) {
  let total = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] !== null) {
        total += grid[row][col];
      }
    }
  }
  return total;
}

export function getEmptyCells(grid) {
  const emptyCells = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }
  return emptyCells;
}

export function loadBestScore() {
  const saved = localStorage.getItem('numMatchBestScore');
  return saved ? parseInt(saved) : 0;
}

export function saveBestScore(score) {
  localStorage.setItem('numMatchBestScore', score.toString());
}

export function loadGameState() {
  const savedGrid = localStorage.getItem('numMatchGrid');
  const savedScore = localStorage.getItem('numMatchScore');
  const savedNextNumber = localStorage.getItem('numMatchNextNumber');
  const savedHammerCount = localStorage.getItem('numMatchHammerCount');
  
  return {
    grid: savedGrid ? JSON.parse(savedGrid) : null,
    score: savedScore ? parseInt(savedScore) : null,
    nextNumber: savedNextNumber ? parseInt(savedNextNumber) : null,
    hammerCount: savedHammerCount ? parseInt(savedHammerCount) : null,
  };
}

export function saveGameState(grid, score, nextNumber, hammerCount) {
  localStorage.setItem('numMatchGrid', JSON.stringify(grid));
  localStorage.setItem('numMatchScore', score.toString());
  localStorage.setItem('numMatchNextNumber', nextNumber.toString());
  localStorage.setItem('numMatchHammerCount', hammerCount.toString());
}

export function clearGameState() {
  localStorage.removeItem('numMatchGrid');
  localStorage.removeItem('numMatchScore');
  localStorage.removeItem('numMatchNextNumber');
  localStorage.removeItem('numMatchHammerCount');
}

