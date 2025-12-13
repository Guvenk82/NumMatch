import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GRID_SIZE,
  SPAWN_DELAY,
  formatNumber,
  calculateNextNumber,
  calculateTotalScore,
  getEmptyCells,
  loadBestScore,
  saveBestScore,
  loadGameState,
  saveGameState,
  clearGameState,
} from '../utils/gameLogic';

export function useGameLogic(resetGame = false) {
  const [grid, setGrid] = useState(() => {
    try {
      const saved = loadGameState();
      if (!resetGame && saved.grid && Array.isArray(saved.grid)) {
        return saved.grid;
      }
    } catch (error) {
      console.error('Error loading grid:', error);
    }
    return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
  });

  const [score, setScore] = useState(() => {
    try {
      const saved = loadGameState();
      if (!resetGame && saved.score !== null && !isNaN(saved.score)) {
        return saved.score;
      }
    } catch (error) {
      console.error('Error loading score:', error);
    }
    return 0;
  });

  const [bestScore, setBestScore] = useState(() => {
    try {
      return loadBestScore();
    } catch (error) {
      console.error('Error loading best score:', error);
      return 0;
    }
  });
  
  const [nextNumber, setNextNumber] = useState(() => {
    try {
      const saved = loadGameState();
      if (!resetGame && saved.nextNumber !== null && !isNaN(saved.nextNumber)) {
        return saved.nextNumber;
      }
    } catch (error) {
      console.error('Error loading next number:', error);
    }
    return 1;
  });

  const [previousNextNumber, setPreviousNextNumber] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [hammerCount, setHammerCount] = useState(() => {
    try {
      const saved = loadGameState();
      if (!resetGame && saved.hammerCount !== null && !isNaN(saved.hammerCount)) {
        return saved.hammerCount;
      }
    } catch (error) {
      console.error('Error loading hammer count:', error);
    }
    return 3;
  });
  const [hammerMode, setHammerMode] = useState(false);

  const spawnIntervalRef = useRef(null);
  const draggedCellRef = useRef(null);

  // Update score when grid changes
  useEffect(() => {
    const newScore = calculateTotalScore(grid);
    setScore(newScore);
    
    if (newScore > bestScore) {
      const newBestScore = newScore;
      setBestScore(newBestScore);
      saveBestScore(newBestScore);
    }
  }, [grid, bestScore]);

  // Update next number
  useEffect(() => {
    const newNextNumber = calculateNextNumber(grid);
    setNextNumber(newNextNumber);
  }, [grid]);

  // Save game state
  useEffect(() => {
    if (grid.some(row => row.some(cell => cell !== null))) {
      saveGameState(grid, score, nextNumber, hammerCount);
    }
  }, [grid, score, nextNumber, hammerCount]);

  const spawnNumber = useCallback(() => {
    if (isPaused) return;

    setGrid(currentGrid => {
      const emptyCells = getEmptyCells(currentGrid);
      
      if (emptyCells.length === 0) {
        // Game over
        if (spawnIntervalRef.current) {
          clearInterval(spawnIntervalRef.current);
          spawnIntervalRef.current = null;
        }
        setTimeout(() => {
          alert('Oyun bitti! Daha iyisini yapabilirsin!\nSkorunuz: ' + formatNumber(calculateTotalScore(currentGrid)));
          clearGameState();
        }, 500);
        return currentGrid;
      }

      // Remove all 1s when next number becomes 2
      if (previousNextNumber === 1 && nextNumber === 2) {
        const newGrid = currentGrid.map(row => 
          row.map(cell => cell === 1 ? null : cell)
        );
        const newEmptyCells = getEmptyCells(newGrid);
        if (newEmptyCells.length === 0) {
          return newGrid;
        }
        const randomIndex = Math.floor(Math.random() * newEmptyCells.length);
        const { row, col } = newEmptyCells[randomIndex];
        newGrid[row][col] = nextNumber;
        setPreviousNextNumber(nextNumber);
        return newGrid;
      }

      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const { row, col } = emptyCells[randomIndex];
      const newGrid = currentGrid.map((r, rIdx) => 
        r.map((c, cIdx) => rIdx === row && cIdx === col ? nextNumber : c)
      );
      setPreviousNextNumber(nextNumber);
      return newGrid;
    });
  }, [isPaused, nextNumber, previousNextNumber]);

  const startSpawning = useCallback(() => {
    if (isPaused) return;
    
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
    }
    
    spawnNumber();
    
    spawnIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        spawnNumber();
      }
    }, SPAWN_DELAY);
  }, [isPaused, spawnNumber]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => {
      const newPaused = !prev;
      
      if (newPaused) {
        if (spawnIntervalRef.current) {
          clearInterval(spawnIntervalRef.current);
          spawnIntervalRef.current = null;
        }
      } else {
        startSpawning();
      }
      
      return newPaused;
    });
  }, [startSpawning]);

  const performMove = useCallback((sourceRow, sourceCol, targetRow, targetCol) => {
    if (isPaused || hammerMode) return;
    if (sourceRow === targetRow && sourceCol === targetCol) return;

    setGrid(currentGrid => {
      const sourceValue = currentGrid[sourceRow][sourceCol];
      const targetValue = currentGrid[targetRow][targetCol];
      
      if (sourceValue === null) return currentGrid;
      
      if (targetValue === null || targetValue === sourceValue) {
        const isMerge = targetValue !== null && targetValue === sourceValue;
        const newValue = isMerge ? sourceValue + targetValue : sourceValue;
        
        const newGrid = currentGrid.map((row, rIdx) => 
          row.map((cell, cIdx) => {
            if (rIdx === sourceRow && cIdx === sourceCol) {
              return null;
            }
            if (rIdx === targetRow && cIdx === targetCol) {
              return newValue;
            }
            return cell;
          })
        );
        
        // Check if game over
        setTimeout(() => {
          const emptyCells = getEmptyCells(newGrid);
          if (emptyCells.length === 0) {
            if (spawnIntervalRef.current) {
              clearInterval(spawnIntervalRef.current);
              spawnIntervalRef.current = null;
            }
            setTimeout(() => {
              alert('Oyun bitti! Daha iyisini yapabilirsin!\nSkorunuz: ' + formatNumber(calculateTotalScore(newGrid)));
              clearGameState();
            }, 500);
          }
        }, 100);
        
        return newGrid;
      }
      
      return currentGrid;
    });
  }, [isPaused, hammerMode]);

  const handleHammerClick = useCallback((row, col) => {
    if (!hammerMode || grid[row][col] === null) return;
    
    setGrid(currentGrid => {
      const newGrid = currentGrid.map((r, rIdx) => 
        r.map((c, cIdx) => rIdx === row && cIdx === col ? null : c)
      );
      return newGrid;
    });
    
    setHammerCount(prev => prev - 1);
    setHammerMode(false);
  }, [hammerMode, grid]);

  const activateHammerMode = useCallback(() => {
    if (hammerCount <= 0 || hammerMode) return;
    setHammerMode(true);
  }, [hammerCount, hammerMode]);

  // Initialize spawning on mount
  useEffect(() => {
    if (!isPaused) {
      spawnNumber();
      spawnIntervalRef.current = setInterval(() => {
        if (!isPaused) {
          spawnNumber();
        }
      }, SPAWN_DELAY);
    }

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
        spawnIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle pause/unpause
  useEffect(() => {
    if (isPaused) {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
        spawnIntervalRef.current = null;
      }
    } else {
      if (spawnIntervalRef.current === null) {
        spawnNumber();
        spawnIntervalRef.current = setInterval(() => {
          spawnNumber();
        }, SPAWN_DELAY);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  return {
    grid,
    score,
    bestScore,
    nextNumber,
    isPaused,
    hammerCount,
    hammerMode,
    draggedCell: draggedCellRef.current,
    setDraggedCell: (cell) => { draggedCellRef.current = cell; },
    togglePause,
    performMove,
    handleHammerClick,
    activateHammerMode,
    resetGame: () => {
      clearGameState();
      setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
      setScore(0);
      setNextNumber(1);
      setPreviousNextNumber(1);
      setHammerCount(3);
      setHammerMode(false);
      setIsPaused(false);
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
        spawnIntervalRef.current = null;
      }
      startSpawning();
    },
  };
}

