const decoLevel1 = [
    {src: 'assets/tieset_cielo_diurno_copia.png', left: 0, top: 0, zIndex: 1, isBg: true },
    {src: 'assets/tileset_torii_plano.svg', left: 600, top: 140, height: 150, width: 150 },
    {src: 'assets/tileset_nube.svg', left: 0, top: 30, height: 80, width: 100, moves: 'horizontal', zIndex: 2 },
];

const decoIntervals = [];

function drawDeco(deco) {
    document.querySelectorAll('.deco').forEach(a => a.remove());
    decoIntervals.forEach(a => clearInterval(a));

    deco.forEach(data => {
        const deco = document.createElement('span');
        deco.classList.add('deco');
        deco.style.backgroundImage = `url(${data.src})`;
        deco.style.left = `${data.left}px`;
        deco.style.top = `${data.top}px`;
        deco.style.zIndex = data.zIndex || 5;

        data.height && (deco.style.height = `${data.height}px`);
        data.width && (deco.style.width = `${data.width}px`);
        data.isBg && deco.classList.add('bg');

        if(data.moves === 'horizontal') {
            let direction = 1;
            const int = setInterval(() => {
                // console.log(deco.offsetLeft, deco.offsetWidth)
                deco.style.left = `${deco.offsetLeft + direction}px`;
                // if the asset gets out of the screen, move it to the other side
                if((deco.offsetLeft + deco.offsetWidth) > (game.clientWidth + deco.offsetWidth)) {
                    deco.style.left = `${-deco.offsetWidth}px`;
                }
            }, 600 / 60);
            decoIntervals.push(int);
        }

        game.appendChild(deco);
    });
}
