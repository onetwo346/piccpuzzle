function reshufflePuzzle() {
    if (!currentMediaUrl) {
        alert("Please upload an image first!");
        return;
    }

    const pieces = document.querySelectorAll('.puzzle-piece');
    if (pieces.length === 0) return;

    const containerSize = puzzleContainer.offsetWidth;
    const pieceSize = containerSize / 4;
    const containerRect = puzzleContainer.getBoundingClientRect();

    pieces.forEach(piece => {
        // Reset piece properties
        piece.style.cursor = 'move';
        piece.style.zIndex = 1;
        
        // Remove and reattach event listeners to ensure draggability
        piece.removeEventListener('mousedown', startDragging);
        piece.removeEventListener('touchstart', startDragging);
        piece.addEventListener('mousedown', startDragging);
        piece.addEventListener('touchstart', startDragging, { passive: false });

        // Calculate safe random positions within viewport
        const maxX = window.innerWidth - pieceSize - 20;
        const maxY = window.innerHeight - pieceSize - 150;
        const randX = Math.max(20, Math.random() * maxX);
        const randY = Math.max(20, Math.random() * maxY);

        // Smooth transition animation
        piece.style.transition = 'all 0.3s ease';
        piece.style.left = `${randX}px`;
        piece.style.top = `${randY}px`;

        // Remove transition after animation
        setTimeout(() => {
            piece.style.transition = '';
        }, 300);
    });

    // Visual feedback on button
    reshuffleBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        reshuffleBtn.style.transform = 'scale(1)';
    }, 200);
}

// Update the button event listener
reshuffleBtn.addEventListener('click', () => {
    reshufflePuzzle();
});

// Also update makeDraggable function to store the startDragging reference
function makeDraggable(piece, pieceSize, rows, cols) {
    let isDragging = false;
    let startX, startY;

    function startDragging(e) {
        // ... existing code ...
    }

    // ... rest of the existing function ...

    piece.startDragging = startDragging; // Store reference for later use
    piece.addEventListener('mousedown', startDragging);
    piece.addEventListener('touchstart', startDragging, { passive: false });
}

// Update createPuzzle to use the stored reference
function createPuzzle(mediaUrl) {
    // ... existing code ...
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // ... piece creation code ...
            makeDraggable(piece, pieceSize, rows, cols);
            puzzleContainer.appendChild(piece);
        }
    }
}
