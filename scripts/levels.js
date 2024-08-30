let currentLevel = 1;

const levels = {
    '1': {
        unlocked: true,
        platforms: platformsLevel1,
        spikes: [],
        tokens: tokensLevel1,
        deco: decoLevel1,
    },
    '2': {
        unlocked: false,
        platforms: platformsLevel2,
        spikes: spikesLevel2,
        tokens: tokensLevel2,
    }
}

// Crear plataformas dinámicamente
function drawLevel() {
    const platforms = levels[currentLevel].platforms;
    drawPlatforms(platforms);

    const spikes = levels[currentLevel].spikes;
    drawSpikes(spikes);

    const tokens = levels[currentLevel].tokens;
    drawTokens(tokens);

    const deco = levels[currentLevel].deco;
    drawDeco(deco);
}

function tokenCollected() {
    const tokens = levels[currentLevel].tokens;
    if(tokens.every(t => t.collected)) {
        changeLevel(++currentLevel);
    }
}


function changeLevel(newLevel) {
    achievementList.find(a => a.id === 12).achieved = true;
    currentLevel = newLevel;
    document.getElementById('current-level').innerText = currentLevel;

    levels[currentLevel].unlocked = true;
    
    resetGame();
    drawLevel();
}