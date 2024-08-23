// Configuración de plataformas para un mapa más grande y desafiante
const tokens = [
    { left: 500, bottom: 200 },
];


// Crear plataformas dinámicamente
function createTokens() {
    tokens.forEach(data => {
        const token = document.createElement('div');
        token.classList.add('token');
        token.style.left = `${data.left}px`;
        token.style.bottom = `${data.bottom}px`;
        game.appendChild(token);

        // on player collission, kill the player
        // setInterval(() => {
        //     const playerRect = player.getBoundingClientRect();
        //     const spikeRect = spike.getBoundingClientRect();
        //     if(checkCollision(playerRect, spikeRect)){
        //     }
        // }, 1000 / 60);
    });
}

function checkCollision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
}