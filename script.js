class NumMatchGame {
    constructor() {
        this.gridSize = 4;
        this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(null));
        this.score = 0;
        this.bestScore = 0;
        this.nextNumber = 1;
        this.spawnInterval = null;
        this.spawnDelay = 1800; // 1.8 saniye
        this.previousNextNumber = 1;
        this.isPaused = false;
        
        this.draggedCell = null;
        this.dragOverCell = null;
        this.touchStartCell = null;
        this.touchStartX = null;
        this.touchStartY = null;
        
        this.loadBestScore();
        this.init();
    }
    
    init() {
        try {
            console.log('Game init started');
            this.createBoard();
            console.log('Board created');
            this.setupButtons();
            console.log('Buttons setup');
            this.startSpawning();
            console.log('Spawning started');
            this.updateDisplay();
            console.log('Display updated');
        } catch (error) {
            console.error('Error in game init:', error);
            alert('Oyun başlatılırken hata: ' + error.message);
        }
    }
    
    setupButtons() {
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.togglePause();
            });
        }
        
        const menuBtn = document.getElementById('menuBtn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                this.showMainMenu();
            });
        }
    }
    
    showMainMenu() {
        // Stop game
        clearInterval(this.spawnInterval);
        this.isPaused = false;
        
        // Hide game container
        document.getElementById('gameContainer').style.display = 'none';
        
        // Show start screen
        const startScreen = document.getElementById('startScreen');
        startScreen.classList.remove('hidden');
        
        // Update best score on start screen
        this.updateStartScreen();
    }
    
    updateStartScreen() {
        const startBestScore = document.getElementById('startBestScore');
        if (startBestScore) {
            startBestScore.textContent = this.formatNumber(this.bestScore);
        }
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (this.isPaused) {
            // Durdur: interval'i temizle
            if (this.spawnInterval) {
                clearInterval(this.spawnInterval);
                this.spawnInterval = null;
            }
            pauseBtn.textContent = 'Devam Et';
            pauseBtn.classList.add('paused');
        } else {
            // Devam Et: interval'i yeniden başlat (spawnNumber'ı hemen çağırma, sadece interval'i başlat)
            pauseBtn.textContent = 'Durdur';
            pauseBtn.classList.remove('paused');
            
            // Interval'i yeniden başlat (bir sonraki spawn zamanını bekle)
            // Sadece interval'i başlat, spawnNumber'ı hemen çağırma
            this.spawnInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.spawnNumber();
                }
            }, this.spawnDelay);
        }
    }
    
    
    loadBestScore() {
        const savedBestScore = localStorage.getItem('numMatchBestScore');
        if (savedBestScore) {
            this.bestScore = parseInt(savedBestScore);
        }
    }
    
    createBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell empty';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                // Drag and drop event listeners (mouse)
                cell.addEventListener('dragstart', (e) => this.handleDragStart(e, row, col));
                cell.addEventListener('dragover', (e) => this.handleDragOver(e, row, col));
                cell.addEventListener('drop', (e) => this.handleDrop(e, row, col));
                cell.addEventListener('dragend', () => this.handleDragEnd());
                cell.addEventListener('dragleave', () => this.handleDragLeave(row, col));
                
                // Touch event listeners (mobile) - improved for better responsiveness
                cell.addEventListener('touchstart', (e) => this.handleTouchStart(e, row, col), { passive: false });
                cell.addEventListener('touchmove', (e) => this.handleTouchMove(e, row, col), { passive: false });
                cell.addEventListener('touchend', (e) => this.handleTouchEnd(e, row, col), { passive: false });
                cell.addEventListener('touchcancel', (e) => this.handleTouchEnd(e, row, col), { passive: false });
                
                gameBoard.appendChild(cell);
            }
        }
    }
    
    startSpawning() {
        if (this.isPaused) return;
        
        // Eğer zaten bir interval varsa, temizle
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
        }
        
        // İlk sayıyı hemen ekle
        this.spawnNumber();
        
        // Sonraki sayıları belirli aralıklarla ekle
        this.spawnInterval = setInterval(() => {
            if (!this.isPaused) {
                this.spawnNumber();
            }
        }, this.spawnDelay);
    }
    
    spawnNumber() {
        if (this.isPaused) return;
        
        const emptyCells = this.getEmptyCells();
        
        // Tüm hücreler doldu mu kontrol et
        if (emptyCells.length === 0) {
            // Oyun tahtası dolu, oyun bitti
            clearInterval(this.spawnInterval);
            this.endGame();
            return;
        }
        
        // Eğer beliren rakam 1'den 2'ye çıktıysa, tüm 1'leri sil
        if (this.previousNextNumber === 1 && this.nextNumber === 2) {
            this.removeAllNumbers(1);
        }
        
        // Rastgele bir boş hücre seç
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { row, col } = emptyCells[randomIndex];
        
        // Sayıyı ekle
        this.grid[row][col] = this.nextNumber;
        this.updateCellDisplay(row, col);
        this.updateDisplay();
        
        this.previousNextNumber = this.nextNumber;
    }
    
    removeAllNumbers(value) {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === value) {
                    this.grid[row][col] = null;
                    this.updateCellDisplay(row, col);
                }
            }
        }
    }
    
    getEmptyCells() {
        const emptyCells = [];
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === null) {
                    emptyCells.push({ row, col });
                }
            }
        }
        return emptyCells;
    }
    
    endGame() {
        // Oyun bitti - tüm hücreler dolu
        this.isPaused = true;
        
        // Spawn interval'i durdur
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        
        // Update best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('numMatchBestScore', this.bestScore.toString());
            this.updateDisplay();
        }
        
        // Oyun bitti mesajı göster
        setTimeout(() => {
            alert('Oyun bitti! Daha iyisini yapabilirsin!\nSkorunuz: ' + this.formatNumber(this.score));
            
            // Ana menüye dön
            this.showMainMenu();
        }, 500);
    }
    
    checkGameOver() {
        // Grid tamamen dolu mu?
        if (this.getEmptyCells().length > 0) {
            return false;
        }
        
        // Yan yana veya üst üste eşleşebilecek hücre var mı?
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const value = this.grid[row][col];
                if (value === null) continue;
                
                // Sağa bak
                if (col < this.gridSize - 1 && this.grid[row][col + 1] === value) {
                    return false;
                }
                // Aşağıya bak
                if (row < this.gridSize - 1 && this.grid[row + 1][col] === value) {
                    return false;
                }
            }
        }
        
        // Oyun bitti
        this.endGame();
        return true;
    }
    
    formatNumber(num) {
        // 8192'den sonra 16k-32k-64k formatında göster
        if (num >= 16384) {
            return (num / 1024).toFixed(0) + 'k';
        }
        // 1024-8192 arası normal göster
        return num.toString();
    }
    
    getNumberColor(value) {
        // Her rakam için farklı renk paleti
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
        
        // 8192'den sonra renkleri döngüsel olarak kullan
        if (value > 8192) {
            const keys = Object.keys(colors).map(Number).sort((a, b) => b - a);
            const baseColor = colors[keys[0]];
            // Büyük sayılar için daha koyu tonlar
            const intensity = Math.min(0.7 + (value / 100000) * 0.3, 1);
            return {
                bg: `linear-gradient(135deg, rgba(102, 51, 153, ${intensity}) 0%, rgba(51, 25, 77, ${intensity}) 100%)`,
                text: '#fff'
            };
        }
        
        return colors[value] || { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#fff' };
    }
    
    updateCellDisplay(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const value = this.grid[row][col];
        
        if (value === null) {
            cell.className = 'cell empty';
            cell.textContent = '';
            cell.style.background = '';
            cell.style.color = '';
            cell.draggable = false;
        } else {
            cell.className = 'cell has-number';
            cell.textContent = this.formatNumber(value);
            cell.draggable = true;
            
            const color = this.getNumberColor(value);
            cell.style.background = color.bg;
            cell.style.color = color.text;
        }
    }
    
    getMaxValue() {
        // Tahtadaki en yüksek değer
        let max = 0;
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] !== null && this.grid[row][col] > max) {
                    max = this.grid[row][col];
                }
            }
        }
        return max;
    }
    
    calculateTotalScore() {
        // Tüm eşleşen (birleştirilen) rakamların toplamı
        let total = 0;
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] !== null) {
                    total += this.grid[row][col];
                }
            }
        }
        return total;
    }
    
    updateDisplay() {
        this.score = this.calculateTotalScore();
        document.getElementById('score').textContent = this.formatNumber(this.score);
        
        // Update best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('numMatchBestScore', this.bestScore.toString());
        }
        document.getElementById('bestScore').textContent = this.formatNumber(this.bestScore);
        
        this.nextNumber = this.calculateNextNumber();
        document.getElementById('nextNumber').textContent = this.formatNumber(this.nextNumber);
    }
    
    calculateNextNumber() {
        // Dinamik zorluk: Tahtadaki en yüksek değer 64'e ulaştığında beliren sayı 2 olur
        // 0-63: 1
        // 64-127: 2
        // 128-255: 4
        // 256-511: 8
        // 512-1023: 16
        // vs.
        
        const maxValue = this.getMaxValue();
        
        if (maxValue < 64) {
            return 1;
        }
        
        // 64'ten sonra her 2^n katında (64, 128, 256, 512...) 2 ile çarpılır
        const multiplier = Math.floor(Math.log2(maxValue / 64)) + 1;
        return Math.pow(2, multiplier);
    }
    
    // Drag and drop handlers
    handleDragStart(e, row, col) {
        // Don't allow moves when paused
        if (this.isPaused) {
            e.preventDefault();
            return;
        }
        
        if (this.grid[row][col] === null) {
            e.preventDefault();
            return;
        }
        
        this.draggedCell = { row, col, value: this.grid[row][col] };
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', '');
    }
    
    handleDragOver(e, row, col) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (this.draggedCell && (this.draggedCell.row !== row || this.draggedCell.col !== col)) {
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (!cell.classList.contains('drag-over')) {
                cell.classList.add('drag-over');
            }
            this.dragOverCell = { row, col };
        }
    }
    
    handleDragLeave(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.remove('drag-over');
    }
    
    handleDrop(e, row, col) {
        e.preventDefault();
        
        if (!this.draggedCell) return;
        
        this.performMove(
            this.draggedCell.row,
            this.draggedCell.col,
            row,
            col
        );
        
        this.handleDragEnd();
    }
    
    performMove(sourceRow, sourceCol, targetRow, targetCol) {
        // Don't allow moves when paused
        if (this.isPaused) {
            return;
        }
        
        if (sourceRow === targetRow && sourceCol === targetCol) {
            return;
        }
        
        const sourceValue = this.grid[sourceRow][sourceCol];
        const targetValue = this.grid[targetRow][targetCol];
        
        if (sourceValue === null) return;
        
        // Hedef hücre boşsa veya aynı değere sahipse birleştir
        if (targetValue === null || targetValue === sourceValue) {
            if (targetValue === null) {
                // Boş hücreye taşı
                this.grid[targetRow][targetCol] = sourceValue;
                this.grid[sourceRow][sourceCol] = null;
            } else {
                // Aynı değerleri birleştir ve topla
                const newValue = sourceValue + targetValue;
                this.grid[targetRow][targetCol] = newValue;
                this.grid[sourceRow][sourceCol] = null;
                
                // Birleştirme animasyonu
                const cell = document.querySelector(`[data-row="${targetRow}"][data-col="${targetCol}"]`);
                cell.classList.add('merge-animation');
                setTimeout(() => {
                    cell.classList.remove('merge-animation');
                }, 500);
            }
            
            this.updateCellDisplay(targetRow, targetCol);
            this.updateCellDisplay(sourceRow, sourceCol);
            this.updateDisplay();
            
            // Check if game is over after move (tüm hücreler doldu mu?)
            setTimeout(() => {
                const emptyCells = this.getEmptyCells();
                if (emptyCells.length === 0) {
                    this.endGame();
                }
            }, 100);
        }
    }
    
    handleDragEnd() {
        // Tüm drag-over sınıflarını temizle
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('drag-over');
            cell.classList.remove('dragging');
        });
        
        this.draggedCell = null;
        this.dragOverCell = null;
    }
    
    // Touch event handlers for mobile - simplified and improved
    handleTouchStart(e, row, col) {
        // Don't allow moves when paused
        if (this.isPaused) {
            return;
        }
        
        if (this.grid[row][col] === null) {
            return;
        }
        
        // Prevent default scrolling
        e.preventDefault();
        e.stopPropagation();
        
        // Start dragging immediately
        this.draggedCell = { row, col, value: this.grid[row][col] };
        this.touchStartCell = { row, col };
        
        // Get touch coordinates
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        
        // Visual feedback
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.classList.add('dragging');
        }
    }
    
    handleTouchMove(e, row, col) {
        if (!this.draggedCell) {
            return;
        }
        
        // Always prevent scrolling when dragging
        e.preventDefault();
        e.stopPropagation();
        
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;
        
        // Find cell at touch point
        const element = document.elementFromPoint(x, y);
        let targetCell = null;
        
        // Try to find a cell element
        if (element) {
            targetCell = element.closest('.cell');
        }
        
        if (targetCell && targetCell.dataset.row && targetCell.dataset.col) {
            const targetRow = parseInt(targetCell.dataset.row);
            const targetCol = parseInt(targetCell.dataset.col);
            
            // Update drag-over visual
            if (targetRow !== this.dragOverCell?.row || targetCol !== this.dragOverCell?.col) {
                // Remove previous drag-over
                document.querySelectorAll('.cell.drag-over').forEach(c => {
                    c.classList.remove('drag-over');
                });
                
                // Add drag-over to new cell
                if (targetRow !== this.draggedCell.row || targetCol !== this.draggedCell.col) {
                    targetCell.classList.add('drag-over');
                    this.dragOverCell = { row: targetRow, col: targetCol };
                }
            }
        }
    }
    
    handleTouchEnd(e, row, col) {
        if (!this.draggedCell) {
            return;
        }
        
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Remove dragging visual
        document.querySelectorAll('.cell.dragging').forEach(c => {
            c.classList.remove('dragging');
        });
        
        // Find target cell
        let targetRow = row;
        let targetCol = col;
        
        if (e && e.changedTouches && e.changedTouches.length > 0) {
            const touch = e.changedTouches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (element) {
                const targetCell = element.closest('.cell');
                if (targetCell && targetCell.dataset.row && targetCell.dataset.col) {
                    targetRow = parseInt(targetCell.dataset.row);
                    targetCol = parseInt(targetCell.dataset.col);
                } else if (this.dragOverCell) {
                    targetRow = this.dragOverCell.row;
                    targetCol = this.dragOverCell.col;
                }
            } else if (this.dragOverCell) {
                targetRow = this.dragOverCell.row;
                targetCol = this.dragOverCell.col;
            }
        } else if (this.dragOverCell) {
            targetRow = this.dragOverCell.row;
            targetCol = this.dragOverCell.col;
        }
        
        // Perform the move
        this.performMove(
            this.draggedCell.row,
            this.draggedCell.col,
            targetRow,
            targetCol
        );
        
        // Clean up
        this.handleDragEnd();
        this.touchStartCell = null;
        this.touchStartX = null;
        this.touchStartY = null;
    }
}

// Global game instance
let currentGame = null;

function startGame() {
    try {
        console.log('startGame called');
        
        // Hide start screen
        const startScreen = document.getElementById('startScreen');
        if (!startScreen) {
            console.error('Start screen not found');
            return;
        }
        startScreen.classList.add('hidden');
        
        // Show game container
        const gameContainer = document.getElementById('gameContainer');
        if (!gameContainer) {
            console.error('Game container not found');
            return;
        }
        gameContainer.style.display = 'flex';
        
        // Create new game
        if (currentGame) {
            if (currentGame.spawnInterval) {
                clearInterval(currentGame.spawnInterval);
            }
        }
        
        console.log('Creating new game...');
        currentGame = new NumMatchGame();
        console.log('Game created successfully');
    } catch (error) {
        console.error('Error in startGame:', error);
        alert('Oyun başlatılırken bir hata oluştu: ' + error.message);
    }
}

// Service Worker Registration for PWA (non-blocking)
// Only register if on HTTPS or localhost
if ('serviceWorker' in navigator) {
    const isSecure = location.protocol === 'https:' || 
                     location.hostname === 'localhost' || 
                     location.hostname === '127.0.0.1';
    
    if (isSecure) {
        window.addEventListener('load', () => {
            // Try to register service worker, but don't block if it fails
            navigator.serviceWorker.register('./sw.js', {
                scope: './'
            })
            .then((registration) => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed (non-critical):', error);
            });
        });
    } else {
        console.log('ServiceWorker not registered: not on HTTPS or localhost');
    }
}

// Oyunu başlat
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    
    try {
        // Load best score for start screen
        const savedBestScore = localStorage.getItem('numMatchBestScore');
        const startBestScore = document.getElementById('startBestScore');
        if (startBestScore) {
            const bestScoreValue = savedBestScore ? parseInt(savedBestScore) : 0;
            startBestScore.textContent = bestScoreValue;
            console.log('Best score loaded:', bestScoreValue);
        } else {
            console.error('startBestScore element not found');
        }
        
        // Setup start button
        const startGameBtn = document.getElementById('startGameBtn');
        if (startGameBtn) {
            console.log('Start button found, adding listener');
            startGameBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Start button clicked');
                startGame();
            });
        } else {
            console.error('startGameBtn not found');
        }
        
        // Prevent zoom on double tap and scrolling (iOS/Android)
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
        
        // Prevent scrolling while dragging
        document.addEventListener('touchmove', (event) => {
            // Only prevent if we're dragging a cell
            if (currentGame && currentGame.draggedCell) {
                event.preventDefault();
            }
        }, { passive: false });
        
        // Prevent pull-to-refresh on mobile
        document.body.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        console.log('Initialization complete');
    } catch (error) {
        console.error('Error in DOMContentLoaded:', error);
        alert('Sayfa yüklenirken bir hata oluştu: ' + error.message);
    }
});
