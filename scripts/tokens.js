// Configuración de plataformas para un mapa más grande y desafiante
const tokensLevel1 = [
    // { left: 10, bottom: 570, collected: false, kanji: '人' },
    { left: 40, bottom: 100, collected: false, kanji: '人' },
    { left: 570, bottom: 180, collected: false, kanji: '私' },
    // { left: 700, bottom: 400, collected: false },
    // { left: 545, bottom: 500, collected: false },
];

const tokensLevel2 = [];

const tokenIntervals = [];

// Crear plataformas dinámicamente
function drawTokens(tokens) {
    document.querySelectorAll('.token').forEach(a => a.remove());
    tokenIntervals.forEach(a => clearInterval(a));
    
    tokens.filter(a => !a.collected).forEach(data => {
        const token = document.createElement('div');
        token.classList.add('token');
        token.style.left = `${data.left}px`;
        token.style.bottom = `${data.bottom}px`;
        token.setAttribute('data-kanji', data.kanji);
        game.appendChild(token);
        
        const intervalID = setInterval(() => {
            const tokenRect = token.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();
            if(gameStatus === 'playing' && !data.collected && checkTokenCollision(playerRect, tokenRect)){
                data.collected = true;
                token.remove();

                tokenCollected();
            }
        }, 500 / 60);

        tokenIntervals.push(intervalID);
    });
}

function checkTokenCollision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
}