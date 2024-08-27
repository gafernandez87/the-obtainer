let currentLevel = 1;

const levels = {
    '1': {
        platforms: platformsLevel1,
        spikes: [],
        tokens: tokensLevel1,
    },
    '2': {
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
    resetGame();
    drawLevel();
}