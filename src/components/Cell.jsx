import React from 'react';
import { formatNumber, getNumberColor } from '../utils/gameLogic';

export default function Cell({ 
  row, 
  col, 
  value, 
  isDragging, 
  isDragOver,
  isMerging,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onClick,
  hammerMode,
}) {
  const isEmpty = value === null;
  const color = !isEmpty ? getNumberColor(value) : null;

  const handleDragStart = (e) => {
    if (isEmpty || hammerMode) {
      e.preventDefault();
      return;
    }
    onDragStart?.(e, row, col);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver?.(e, row, col);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop?.(e, row, col);
  };

  const handleClick = () => {
    if (hammerMode && !isEmpty) {
      onClick?.(row, col);
    }
  };

  return (
    <div
      className={`
        relative flex items-center justify-center
        rounded-2xl font-bold text-lg
        transition-all duration-300
        select-none touch-none
        ${isEmpty 
          ? 'bg-gray-100/60 border-2 border-dashed border-primary-500/20 shadow-inner' 
          : 'bg-white border border-white/40 shadow-lg cursor-grab active:cursor-grabbing'
        }
        ${isDragging ? 'opacity-60 scale-110 z-50' : ''}
        ${isDragOver ? 'bg-primary-500/30 scale-105 border-3 border-dashed border-primary-500 shadow-xl' : ''}
        ${isMerging ? 'animate-merge' : ''}
        ${!isEmpty ? 'animate-pop-in' : ''}
      `}
      style={!isEmpty ? {
        background: color?.bg,
        color: color?.text,
      } : {}}
      draggable={!isEmpty && !hammerMode}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      onTouchStart={(e) => onTouchStart?.(e, row, col)}
      onTouchMove={(e) => onTouchMove?.(e, row, col)}
      onTouchEnd={(e) => onTouchEnd?.(e, row, col)}
      onClick={handleClick}
    >
      {!isEmpty && formatNumber(value)}
    </div>
  );
}

