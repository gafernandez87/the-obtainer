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

    handlePlatformCollisions();
    enforceVerticalBounds();
    checkForWin();
}

// Manejar colisiones con las plataformas
function handlePlatformCollisions() {
    const platforms = document.getElementsByClassName('platform');
    for (let platform of platforms) {
        if (
            player.offsetLeft < platform.offsetLeft + platform.offsetWidth &&
            player.offsetLeft + player.offsetWidth > platform.offsetLeft &&
            player.offsetTop + player.offsetHeight > platform.offsetTop &&
            player.offsetTop + player.offsetHeight < platform.offsetTop + platform.offsetHeight &&
            velocityY > 0
        ) {
            velocityY = 0;
            isJumping = false;
            player.style.top = `${platform.offsetTop - player.offsetHeight}px`;
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

// Verificar si el jugador ha tocado el objetivo
function checkForWin() {
    // const goal = document.getElementById('goal');
    // if (
    //     player.offsetLeft < goal.offsetLeft + goal.offsetWidth &&
    //     player.offsetLeft + player.offsetWidth > goal.offsetLeft &&
    //     player.offsetTop < goal.offsetTop + goal.offsetHeight &&
    //     player.offsetTop + player.offsetHeight > goal.offsetTop
    // ) {
    //     alert('¡Has ganado!');
    //     resetGame();
    // }
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
    requestAnimationFrame(gameLoop);
}

// Inicializar el juego
function initGame() {
    createPlatforms();
    createSpikes();
    handleInput();

    addTestSquare();
    gameLoop();

}

function addTestSquare() {


    // add a div that can be draggable using the mouse
    const draggable = document.createElement('div');
    draggable.classList.add('draggable');
    draggable.style.position = 'absolute';
    draggable.style.width = '50px';
    draggable.style.height = '50px';
    draggable.style.backgroundColor = 'red';
    draggable.style.left = '0px';
    draggable.style.top = '0px';
    game.appendChild(draggable);

    // make the div draggable only when mouse is down
    let isMouseDown = false;
    draggable.addEventListener('mousedown', () => isMouseDown = true);
    draggable.addEventListener('mouseup', () => isMouseDown = false);
    game.addEventListener('mousemove', (e) => {
        if(isMouseDown) {
            draggable.style.left = `${e.clientX - game.offsetLeft - 10}px`;
            draggable.style.top = `${e.clientY - game.offsetTop - 10}px`;

            // set the x value into input #test-x
            document.getElementById("test-x").value = e.clientX - game.offsetLeft - 10;
            document.getElementById("test-y").value = e.clientY - game.offsetTop - 10;
        }
    });

}

initGame();
