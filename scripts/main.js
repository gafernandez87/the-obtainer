const player = document.getElementById('player');
const game = document.getElementById('game');

let velocityX = 0;
let velocityY = 0;
let gravity = 0.5;
let isJumping = false;
let speed = 3;

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

// Manejar colisiones con las plataformas
function handlePlatformCollisions() {
    const platforms = document.getElementsByClassName('platform');
    const updatedPlayer  = document.getElementById('player');
    const pLeft = updatedPlayer.offsetLeft;
    const pRight = updatedPlayer.offsetLeft + updatedPlayer.offsetWidth;
    const pBottom = updatedPlayer.offsetTop + updatedPlayer.offsetHeight;
    
    for (let platform of platforms) {
        if (
            velocityY > 0 &&
            pLeft < (platform.offsetLeft + platform.offsetWidth -10) &&
            (pRight - 10) > platform.offsetLeft
            && platform.offsetTop - pBottom < 3
            && player.offsetTop <= platform.offsetTop + platform.offsetHeight
        ) {
            velocityY = 0;
            isJumping = false;
            player.style.top = `${platform.offsetTop - player.offsetHeight - 1}px`;
        }

        // Add horizontal collision detection right
        if(
            velocityX > 0
            && pRight > platform.offsetLeft && pRight < platform.offsetLeft + platform.offsetWidth
            && pBottom-5 > platform.offsetTop
            && player.offsetTop < platform.offsetTop + platform.offsetHeight
        ) {
            player.style.left = `${platform.offsetLeft - player.offsetWidth}px`;
        }

        // add horizontal collision detection left
        if(
            velocityX < 0
            && pLeft < platform.offsetLeft + platform.offsetWidth && pLeft > platform.offsetLeft
            && (pBottom-5) > platform.offsetTop
            && player.offsetTop < platform.offsetTop + platform.offsetHeight
        ) {
            player.style.left = `${platform.offsetLeft + platform.offsetWidth}px`;
        }

    }
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
    player.style.left = '130px';
    player.style.top = '550px';
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
    requestAnimationFrame(gameLoop);
}


// Inicializar el juego
function initGame() {
    createPlatforms();
    createSpikes();
    handleInput();

    gameLoop();
    debug();
}

initGame();


/// TEST CODE< DELETE LATER
// if key "g" is pressed, run the debug function
document.addEventListener('keydown', (e) => {
    if (e.key === 'g') {
        debug();
    }
});


function debug() {
    const debugSection = document.querySelector('.debug');
    const platformButton = document.getElementById("add-platform");
    const showCoordinatesButton = document.getElementById("show-coordinates");
    const showSizeButton = document.getElementById("show-size");
    
    
    debugSection.style.display = 'flex';
    platformButton.addEventListener("click", addNewPlatform);
    showCoordinatesButton.addEventListener("click", showPlatformCoordinates);
    showSizeButton.addEventListener("click", showPlatformSize);

    if(!debugConfig.isDebugging) {
        debugConfig.isDebugging = true;

    } else {
        document.querySelector('.debug').style.display = 'none';
        debugConfig.isDebugging = false;
    }
}

function log(data) {
    // print data in textarea without overriding with id log
    const log = document.getElementById('log');

    const newData = JSON.stringify(data);
    
    //only print if the current data is different than the last line printed
    if(log.value.trim() !== '' && log.value.trim().split('\n').pop() === newData) return;
    log.value += newData + '\n';

    // scroll to the bottom of the textarea
    log.scrollTop = log.scrollHeight;
}