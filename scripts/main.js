const player = document.getElementById('player');
const game = document.getElementById('game');

let gameStatus = 'menu';

let gameLoopId = null;

let velocityX = 0;
let velocityY = 0;
let isJumping = false;
const gravity = 0.5;
const speed = 3;

const keys = {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false
};

const debugConfig = {
    isDebugging: false,
    showCoordinates: false,
    showSize: false,
}


// Manejar la entrada del teclado
function handleInput() {
    document.addEventListener('keydown', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = false;
        }
    });
}

// Actualizar posición horizontal del jugador
function updateHorizontalPosition() {
    if (keys.ArrowRight) {
        velocityX = speed;
    } else if (keys.ArrowLeft) {
        velocityX = -speed;
    } else {
        velocityX = 0;
    }
    
    player.style.left = `${player.offsetLeft + velocityX}px`;
    enforceHorizontalBounds();
}

// Limitar la posición horizontal del jugador dentro del juego
function enforceHorizontalBounds() {
    if (player.offsetLeft < 0) player.style.left = '0px';
    if (player.offsetLeft + player.offsetWidth > game.clientWidth) {
        player.style.left = `${game.clientWidth - player.offsetWidth}px`;
    }
}

// Actualizar posición vertical del jugador
function updateVerticalPosition() {
    if (keys.ArrowUp && !isJumping) {
        velocityY = -10;
        isJumping = true;
        jumpCounter++;
    }

    velocityY += gravity;
    player.style.top = `${player.offsetTop + velocityY}px`;

    enforceVerticalBounds();
}

// Evitar que el jugador caiga fuera del juego
function enforceVerticalBounds() {
    if (player.offsetTop + player.offsetHeight > game.clientHeight) {
        player.style.top = `${game.clientHeight - player.offsetHeight}px`;
        velocityY = 0;
        isJumping = false;
    }
}

// Restablecer el juego después de ganar
function resetGame() {
    player.style.left = '120px';
    player.style.bottom = '40px';
    velocityX = 0;
    velocityY = 0;
    isJumping = false;
}

// Bucle principal del juego
function gameLoop() {
    updateHorizontalPosition();
    updateVerticalPosition();
    checkAchievementCollision();
    handlePlatformCollisions();
    checkForWin();
    gameLoopId = requestAnimationFrame(gameLoop);
}

// Inicializar el juego
function initGame() {
    document.querySelector('.game-container').style.display = 'flex';
    drawLevel();
    handleInput();

    gameLoop();
    // debug();
}

// initGame();

function setupMenu() {
    //check each level in the levels array and add class unlocked in element data-level="1"
    Object.keys(levels).forEach((key, index) => {
        const level = levels[key];
        const levelElement = document.querySelector(`[data-level="${index + 1}"]`);
        level.unlocked && levelElement.classList.add('unlocked');
        levelElement.addEventListener('click', (e) => {
            const levelClicked = e.target.dataset.level;
            if(levels[levelClicked].unlocked) {
                currentLevel = index + 1;
                document.querySelector('.menu').style.display = 'none';
                gameStatus = 'playing';
                initGame();
            }
        });
    });
}

function updateMenu(){
    Object.keys(levels).forEach((key, index) => {
        const level = levels[key];
        const levelElement = document.querySelector(`[data-level="${index + 1}"]`);
        level.unlocked && levelElement.classList.add('unlocked');
    });
}

document.querySelector('.go-to-menu').addEventListener('click', () => {
    document.querySelector('.menu').style.display = 'flex';
    document.querySelector('.game-container').style.display = 'none';
    gameStatus = 'menu';
    gameLoopId && cancelAnimationFrame(gameLoopId);
    resetGame();
    updateMenu();
});

setupMenu();
