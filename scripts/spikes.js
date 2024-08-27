// Configuración de plataformas para un mapa más grande y desafiante
const spikesLevel2 = [];

const spikeIntervals = [];

function genereateLvl2(){
    let from = 240;
    for(let i= 0; i < 4; i++){
        spikesLevel2.push({left: from, bottom: 0});
        from += 20;
    }

    from = 420;
    for(let i= 0; i < 15; i++){
        spikesLevel2.push({left: from, bottom: 0});
        from += 20;
    }

    spikesLevel2.push({ left: 280, bottom: 0 });
    spikesLevel2.push({ left: 300, bottom: 0 });
}
genereateLvl2();

// Crear plataformas dinámicamente
function drawSpikes(spikesData) {
    document.querySelectorAll('.spike').forEach(a => a.remove());
    spikeIntervals.forEach(a => clearInterval(a));

    spikesData.forEach(data => {
        const spike = document.createElement('div');
        spike.classList.add('spike');
        spike.style.left = `${data.left}px`;
        spike.style.bottom = `${data.bottom}px`;
        game.appendChild(spike);

        // on player collission, kill the player
        const intervalID = setInterval(() => {
            const playerRect = player.getBoundingClientRect();
            const spikeRect = spike.getBoundingClientRect();
            if(checkSpikeCollision(playerRect, spikeRect)){
                diedCounter++;
                resetGame();
            }
        }, 1000 / 60);

        spikeIntervals.push(intervalID);
    });
}

function checkSpikeCollision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
}