// Canvas setup
const canvas = document.getElementById('game-canvas');
canvas.width = window.innerWidth; // Adjust the canvas width to the window size
canvas.height = window.innerHeight; // Adjust the canvas height to the window size
const ctx = canvas.getContext('2d');

// Game objects
const player = {
    x: 50,
    y: canvas.height / 2,
    width: 20,
    height: 20,
    speed: 5,
    color: '#00FF00',
};

const enemies = [];

let score = 0;
let spawnRate = 1000; // Spawn 5 enemies every 1000 milliseconds (1 second)

let gameRunning = false;

// Game functions
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player position
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw enemies
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        enemy.x -= enemy.speed;

        // Collision detection
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // Game over logic
            gameRunning = false;
            alert(`Game Over! Your score: ${score}`);
            restartGame();
        }

        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Update score
    score++;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 25);

    if (gameRunning) {
        requestAnimationFrame(update);
    }
}

function restartGame() {
    // Reset variables
    player.x = 50;
    player.y = canvas.height / 2;
    score = 0;
    spawnRate = 1000; // Spawn 5 enemies per second
    enemies.length = 0;
    gameRunning = false;
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        spawnEnemiesGroup();
        update();
    }
}

function spawnEnemiesGroup() {
    for (let i = 0; i < 5; i++) {
        const enemy = {
            x: canvas.width,
            y: Math.random() * (canvas.height - 20),
            width: 20,
            height: 20,
            speed: 5,
            color: '#FF0000',
        };

        enemies.push(enemy);
    }

    setTimeout(spawnEnemiesGroup, spawnRate); // Spawn enemies every 1000 milliseconds (1 second)
}

// Keyboard input handling
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    if (event.key === 'ArrowUp') {
        startGame();
    }
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Touch input handling
let touchStartY = 0;
let touchEndY = 0;

canvas.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
});

canvas.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY;

    if (touchEndY < touchStartY) {
        keys.ArrowUp = true;
        startGame();
    } else {
        keys.ArrowUp = false;
    }
});

// Start the game when the up arrow key is pressed
alert('Press the up arrow key or swipe up to start the game!');
