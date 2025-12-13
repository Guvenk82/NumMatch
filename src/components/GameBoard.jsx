import React, { useState, useEffect } from 'react';
import Cell from './Cell';

export default function GameBoard({ 
  grid, 
  performMove, 
  handleHammerClick,
  hammerMode,
  draggedCell,
  setDraggedCell,
}) {
  const [dragOverCell, setDragOverCell] = useState(null);
  const [touchStartCell, setTouchStartCell] = useState(null);
  const [mergingCell, setMergingCell] = useState(null);

  // Reset merging cell after animation
  useEffect(() => {
    if (mergingCell) {
      const timer = setTimeout(() => setMergingCell(null), 500);
      return () => clearTimeout(timer);
    }
  }, [mergingCell]);

  const handleDragStart = (e, row, col) => {
    setDraggedCell({ row, col, value: grid[row][col] });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e, row, col) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedCell && (draggedCell.row !== row || draggedCell.col !== col)) {
      setDragOverCell({ row, col });
    }
  };

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    
    if (draggedCell) {
    const targetValue = grid[targetRow][targetCol];
    const sourceValue = grid[draggedCell.row][draggedCell.col];
    const isMerge = targetValue !== null && targetValue === sourceValue;
    
    if (isMerge) {
      setMergingCell({ row: targetRow, col: targetCol });
    }
    
    performMove(draggedCell.row, draggedCell.col, targetRow, targetCol);
    }
    
    handleDragEnd();
  };

  const handleDragEnd = () => {
    setDraggedCell(null);
    setDragOverCell(null);
  };

  const handleTouchStart = (e, row, col) => {
    if (grid[row][col] === null) return;
    
    e.preventDefault();
    setDraggedCell({ row, col, value: grid[row][col] });
    setTouchStartCell({ row, col });
  };

  const handleTouchMove = (e, row, col) => {
    if (!draggedCell) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetCell = element?.closest('[data-cell]');
    
    if (targetCell) {
      const targetRow = parseInt(targetCell.dataset.row);
      const targetCol = parseInt(targetCell.dataset.col);
      if (targetRow !== dragOverCell?.row || targetCol !== dragOverCell?.col) {
        setDragOverCell({ row: targetRow, col: targetCol });
      }
    }
  };

  const handleTouchEnd = (e, row, col) => {
    if (!draggedCell) return;
    
    if (e) {
      e.preventDefault();
    }
    
    const touch = e?.changedTouches?.[0];
    let targetRow = row;
    let targetCol = col;
    
    if (touch) {
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetCell = element?.closest('[data-cell]');
      if (targetCell) {
        targetRow = parseInt(targetCell.dataset.row);
        targetCol = parseInt(targetCell.dataset.col);
      } else if (dragOverCell) {
        targetRow = dragOverCell.row;
        targetCol = dragOverCell.col;
      }
    } else if (dragOverCell) {
      targetRow = dragOverCell.row;
      targetCol = dragOverCell.col;
    }
    
    const targetValue = grid[targetRow]?.[targetCol];
    const sourceValue = grid[draggedCell.row]?.[draggedCell.col];
    const isMerge = targetValue !== null && targetValue === sourceValue;
    
    if (isMerge) {
      setMergingCell({ row: targetRow, col: targetCol });
    }
    
    performMove(draggedCell.row, draggedCell.col, targetRow, targetCol);
    
    setDraggedCell(null);
    setDragOverCell(null);
    setTouchStartCell(null);
  };

  return (
    <div 
      className={`
        grid grid-cols-4 grid-rows-4 gap-2.5
        bg-gradient-to-br from-primary-500/8 to-primary-600/8
        p-3.5 rounded-3xl
        border border-primary-500/15
        shadow-inner
        ${hammerMode ? 'cursor-hammer' : ''}
      `}
    >
      {grid.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <div key={`${rowIdx}-${colIdx}`} data-cell data-row={rowIdx} data-col={colIdx}>
            <Cell
              row={rowIdx}
              col={colIdx}
              value={cell}
              isDragging={draggedCell?.row === rowIdx && draggedCell?.col === colIdx}
              isDragOver={dragOverCell?.row === rowIdx && dragOverCell?.col === colIdx}
              isMerging={mergingCell?.row === rowIdx && mergingCell?.col === colIdx}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleHammerClick}
              hammerMode={hammerMode}
            />
          </div>
        ))
      )}
    </div>
  );
}

