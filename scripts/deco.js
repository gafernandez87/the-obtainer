const decoLevel1 = [
    {src: 'assets/tieset_cielo_diurno_copia.png', left: 0, top: 0, zIndex: 1, isBg: true },
    {src: 'assets/tileset_torii_plano.svg', left: 600, top: 140, height: 150, width: 150 },
];

function drawDeco(deco) {
    document.querySelectorAll('.deco').forEach(a => a.remove());

    deco.forEach(data => {
        const deco = document.createElement('span');
        deco.classList.add('deco');
        deco.style.backgroundImage = `url(${data.src})`;
        console.log(deco)
        deco.style.left = `${data.left}px`;
        deco.style.top = `${data.top}px`;
        data.height && (deco.style.height = `${data.height}px`);
        data.width && (deco.style.width = `${data.width}px`);
        deco.style.zIndex = data.zIndex || 5;
        data.isBg && deco.classList.add('bg');
        game.appendChild(deco);
    });
}
