// Configuración de plataformas para un mapa más grande y desafiante
const platformsLevel1 = [
    { left: 0, bottom: 0, height: 70, width: 100 },
    { left: 160, bottom: 0, height: 100, width: 90},
    { left: 350, bottom: 0, height: 100, width: 100},
    { left: 330, bottom: 0, height: 20, width: 20},
    { left: 720, bottom: 0, height: 100, width: 100},
    { left: 480, bottom: 130, height: 20, width: 200 },
    { left: 700, bottom: 0, height: 20, width: 20},
    
    { left: 960, bottom: 60, height: 10, width: 40},
    { left: 960, bottom: 130, height: 10, width: 40},
    { left: 960, bottom: 200, height: 10, width: 40},
    { left: 960, bottom: 270, height: 10, width: 40},
    
    
    { left: 0, bottom: 300, height: 20, width: 880},

    { left: 0, bottom: 500, height: 40, width: 280},

    { left: 0, bottom: 320, height: 30, width: 30},
    { left: 80, bottom: 390, height: 30, width: 230},
    { left: 350, bottom: 390, height: 30, width: 230},
    { left: 340, bottom: 500, height: 20, width: 100},
    { left: 580, bottom: 390, height: 180, width: 20},
    { left: 530, bottom: 470, height: 20, width: 50},
];

const platformsLevel2 = [
    { left: 0, bottom: 0, height: 70, width: 100 },
    { left: 320, bottom: 0, height: 100, width: 100},
    { left: 160, bottom: 130, height: 20, width: 90},
    { left: 720, bottom: 0, height: 100, width: 100},
    { left: 450, bottom: 130, height: 20, width: 100, move: 'h', from: 450, to: 600, speed: 600 },
    
    { left: 960, bottom: 60, height: 10, width: 40},
    { left: 960, bottom: 130, height: 10, width: 40},
    { left: 960, bottom: 200, height: 10, width: 40},
    { left: 960, bottom: 270, height: 10, width: 40},
    
    
    { left: 440, bottom: 300, height: 20, width: 440},
    { left: 0, bottom: 300, height: 20, width: 330},

    { left: 0, bottom: 500, height: 60, width: 330}
];

const platformIntervals = [];

function drawPlatforms(platforms) {
    document.querySelectorAll('.platform').forEach(a => a.remove());

    platformIntervals.forEach(a => clearInterval(a));

    platforms.forEach(data => {
        const platform = document.createElement('div');
        platform.classList.add('platform');
        platform.style.left = `${data.left}px`;
        platform.style.bottom = `${data.bottom}px`;
        platform.style.height = `${data.height}px`;
        platform.style.width = `${data.width}px`;
        game.appendChild(platform);
        
        if(data.move){ 
            // make the platform move horizontally if move === h or vertically if move === v using from and to
            let direction = 1;
            const intervalID = setInterval(() => {
                if(data.move === 'h'){
                    if(data.left >= data.to) direction = -1;
                    if(data.left <= data.from) direction = 1;
                    data.left += direction;
                    platform.style.left = `${data.left}px`;
                }
                if(data.move === 'v'){
                    if(data.bottom >= data.to) direction = -1;
                    if(data.bottom <= data.from) direction = 1;
                    data.bottom += direction;
                    platform.style.bottom = `${data.bottom}px`;
                }
            }, data.speed / 60);

            platformIntervals.push(intervalID);
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