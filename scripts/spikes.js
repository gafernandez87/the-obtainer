// Configuración de plataformas para un mapa más grande y desafiante
const spikesData = [
    { left: 415, bottom: 0 },
];

// Crear plataformas dinámicamente
function createSpikes() {
    spikesData.forEach(data => {
        const spike = document.createElement('div');
        spike.classList.add('spike');
        spike.style.left = `${data.left}px`;
        spike.style.bottom = `${data.bottom}px`;
        game.appendChild(spike);

        // on player collission, kill the player
        setInterval(() => {
            const playerRect = player.getBoundingClientRect();
            const spikeRect = spike.getBoundingClientRect();
            if(checkCollision(playerRect, spikeRect)){
                diedCounter++;
                resetGame();
            }
        }, 1000 / 60);
    });
}

function checkCollision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
}