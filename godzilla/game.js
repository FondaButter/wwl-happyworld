const GRID_WIDTH = 28;
const GRID_HEIGHT = 11;

// 0: Heart, 1: Wall, 2: Start (No heart), 3: Special Wall
const MAZE_LAYOUT = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Re-adjusting to better match "LOVE" or the image layout
// The image shows "LOVE" spelling out with blocks.
// Let's refine the layout to be more accurate to the image.
const MAZE = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 3, 0, 3, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 3, 3, 3, 0, 1, 0, 0, 0, 1, 0, 1, 0, 3, 0, 3, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 3, 0, 1, 3, 1, 0, 3, 3, 3, 1, 0, 1, 3, 0, 3, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 3, 3, 1, 3, 1, 0, 0, 3, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 3, 0, 3, 0, 1, 0, 0, 3, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1],
];

let playerPos = { x: 1, y: 1 };
let hearts = [];

const boardElement = document.getElementById('game-board');
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const resetBtn = document.getElementById('reset-btn');

function initGame() {
    boardElement.innerHTML = '';
    playerPos = { x: 1, y: 1 };
    hearts = [];

    for (let y = 0; y < MAZE.length; y++) {
        for (let x = 0; x < MAZE[y].length; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;

            if (MAZE[y][x] === 1) {
                cell.classList.add('wall');
            } else if (MAZE[y][x] === 3) {
                cell.classList.add('special-wall');
            } else if (MAZE[y][x] === 0 || MAZE[y][x] === 2) {
                // MAZE[y][x] === 2 is start position, usually no heart but can be added
                if (MAZE[y][x] === 0) {
                    const heart = document.createElement('img');
                    heart.src = 'assets/heart.png'; // [可修改] 心形(豆子)圖標
                    heart.classList.add('heart-icon');
                    cell.appendChild(heart);
                    hearts.push({ x, y, collected: false, element: heart });
                }
            }

            boardElement.appendChild(cell);
        }
    }

    updatePlayer();
}

function updatePlayer() {
    // Remove existing player icon
    const oldPlayer = document.querySelector('.player-icon');
    if (oldPlayer) oldPlayer.remove();

    // Create new player icon
    const playerIcon = document.createElement('img');
    playerIcon.src = 'assets/player.png'; // [可修改] 玩家操作的吃豆人圖標
    playerIcon.classList.add('player-icon');

    const targetCell = document.querySelector(`.cell[data-x="${playerPos.x}"][data-y="${playerPos.y}"]`);
    if (targetCell) {
        targetCell.appendChild(playerIcon);
    }

    // Check for heart collection
    const heartIndex = hearts.findIndex(h => h.x === playerPos.x && h.y === playerPos.y && !h.collected);
    if (heartIndex !== -1) {
        hearts[heartIndex].collected = true;
        hearts[heartIndex].element.style.visibility = 'hidden';
    }
}

function movePlayer(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Check bounds
    if (newY >= 0 && newY < MAZE.length && newX >= 0 && newX < MAZE[0].length) {
        // Check walls
        if (MAZE[newY][newX] !== 1 && MAZE[newY][newX] !== 3) {
            playerPos.x = newX;
            playerPos.y = newY;
            updatePlayer();
        }
    }
}

// Event Listeners
btnUp.parentElement.addEventListener('click', () => movePlayer(0, -1));
btnDown.parentElement.addEventListener('click', () => movePlayer(0, 1));
btnLeft.parentElement.addEventListener('click', () => movePlayer(-1, 0));
btnRight.parentElement.addEventListener('click', () => movePlayer(1, 0));

resetBtn.addEventListener('click', () => {
    initGame();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
    }
});

initGame();
