// Configuración de plataformas para un mapa más grande y desafiante
const platformData = [
    { left: 0, top: 500, height: 100, width: 100 },
    { left: 200, top: 450, height: 20, width: 100 },
    { left: 900, top: 500, height: 100, width: 100},
    { left: 300, top: 500, height: 20, width: 100, move: 'v', from: 200, to: 500, speed: 200 },
    { left: 450, top: 500, height: 20, width: 100, move: 'v', from: 0, to: 200, speed: 700 },
    // { left: 750, top: 250, height: 20, width: 100 },
    // { left: 900, top: 200, height: 20, width: 100 },
    // { left: 1050, top: 150, height: 20, width: 100 },
    // { left: 1200, top: 100, height: 20, width: 100 },
    // { left: 1350, top: 50, height: 20, width: 100 },
    // { left: 700, top: 450, height: 20, width: 100 },
    // { left: 850, top: 400, height: 20, width: 100 },
    // { left: 1000, top: 350, height: 20, width: 100 },
    // { left: 1150, top: 300, height: 20, width: 100 },
    // { left: 1300, top: 250, height: 20, width: 100 },
    // { left: 1450, top: 200, height: 20, width: 100 },
];

// Crear plataformas dinámicamente
function createPlatforms() {
    platformData.forEach(data => {
        const platform = document.createElement('div');
        platform.classList.add('platform');
        platform.style.left = `${data.left}px`;
        platform.style.top = `${data.top}px`;
        platform.style.height = `${data.height}px`;
        platform.style.width = `${data.width}px`;
        game.appendChild(platform);
        
        if(data.move){ 
            // make the platform move horizontally if move === h or vertically if move === v using from and to
            let direction = 1;
            setInterval(() => {
                if(data.move === 'h'){
                    if(data.left >= data.to) direction = -1;
                    if(data.left <= data.from) direction = 1;
                    data.left += direction;
                    platform.style.left = `${data.left}px`;
                }
                if(data.move === 'v'){
                    if(data.top >= data.to) direction = -1;
                    if(data.top <= data.from) direction = 1;
                    data.top += direction;
                    platform.style.top = `${data.top}px`;
                }
            }, data.speed / 60);
        }

    });
}