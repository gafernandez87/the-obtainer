// Configuración de plataformas para un mapa más grande y desafiante
const platformData = [
    { left: 0, top: 500, height: 100, width: 100 },
    { left: 200, top: 450, height: 20, width: 100 },
    { left: 900, top: 540, height: 60, width: 100},
    { left: 300, top: 500, height: 20, width: 100, move: 'v', from: 200, to: 500, speed: 200 },
    { left: 450, top: 500, height: 20, width: 100, move: 'v', from: 0, to: 200, speed: 700 },
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

function showPlatformCoordinates(){
    // show the coordinates of each platform inside each platform
    if(!debugConfig.showCoordinates) {
        debugConfig.showCoordinates = true;
        document.querySelectorAll('.platform').forEach(platform => {
            const rect = platform.getBoundingClientRect();
            // Crear el elemento para mostrar las coordenadas
            const coordinates = document.createElement('div');
            coordinates.classList.add('coordinates');
            coordinates.style.position = 'absolute';
            coordinates.style.color = 'white';
            coordinates.style.fontSize = '12px';
            coordinates.style.bottom = '5px';
            coordinates.style.left = '5px';
            coordinates.innerText = `(${rect.left}; ${rect.top})`;
            platform.appendChild(coordinates);
        });
    } else {
        debugConfig.showCoordinates = false;
        document.querySelectorAll('.coordinates').forEach(coordinates => coordinates.remove());
    }
}

function showPlatformSize(){
    // show the size of each platform inside each platform
    if(!debugConfig.showSize) {
        debugConfig.showSize = true;
        document.querySelectorAll('.platform').forEach(platform => {
            const rect = platform.getBoundingClientRect();
            // Crear el elemento para mostrar las coordenadas
            const size = document.createElement('div');
            size.classList.add('size');
            size.style.position = 'absolute';
            size.style.color = 'yellow';
            size.style.fontSize = '12px';
            size.style.bottom = '15px';
            size.style.left = '5px';
            size.innerText = `(${rect.width}; ${rect.height})`;
            platform.appendChild(size);
        });
    } else {
        debugConfig.showSize = false;
        document.querySelectorAll('.size').forEach(size => size.remove());
    }
}

function addNewPlatform() {
    const w = document.getElementById('new-platform-width');
    const h = document.getElementById('new-platform-height');

    // add a div that can be draggable using the mouse
    const draggable = document.createElement('div');
    draggable.classList.add('draggable');
    draggable.classList.add('platform');
    draggable.style.position = 'absolute';
    draggable.style.width = w.value + 'px';
    draggable.style.height = h.value + 'px';
    draggable.style.backgroundColor = '#555';
    draggable.style.left = 0;
    draggable.style.top = 0;
    
    w.value = '100';
    h.value = '100';

    game.appendChild(draggable);

    // make the div draggable only when mouse is down
    let isMouseDown = false;
    draggable.addEventListener('mousedown', () => isMouseDown = true);
    draggable.addEventListener('mouseup', () => isMouseDown = false);
    game.addEventListener('mousemove', (e) => {
        if(isMouseDown) {
            draggable.style.left = `${e.clientX - game.offsetLeft - 10}px`;
            draggable.style.top = `${e.clientY - game.offsetTop - 10}px`;
        }
    });

}