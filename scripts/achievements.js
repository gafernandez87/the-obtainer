let jumpCounter = 0;
let diedCounter = 0;
let timer = 0;

const achievementList = [
    { id: 1, title: 'Hola mundo!', description: 'A plena vista', achieved: false , left: 620, top: 570, height: 10, width: 10, 
        check: function({player}, box){
            return this.achieved ||
                player.top < box.bottom && player.right > box.left && player.left < box.right;
        } 
    },
    { id: 2, title: 'Saltar', description: 'Saltar 1 vez', achieved: false , left: 0, top: 0, check: () => jumpCounter >= 1},
    { id: 3, title: 'Saltarín', description: 'Saltar 10 veces', achieved: false , left: 0, top: 0, check: () => jumpCounter >= 10},
    { id: 4, title: 'Resorte', description: 'Saltar 100 veces', achieved: false , left: 0, top: 0, check: () => jumpCounter >= 100},
    { id: 5, title: 'Límites 1', description: 'Tocar la pared derecha', achieved: false , left: 0, top: 0, 
        check: function({player, game}){
            return this.achieved || player.right >= game.right;
        }
    },
    { id: 6, title: 'Límites 2', description: 'Tocar la pared izquierda', achieved: false , left: 0, top: 0, 
        check: function({player, game}) {
            return this.achieved || player.left <= game.left
        }
    },
    { id: 7, title: 'Límites 3', description: 'Tocar el techo', achieved: false , left: 0, top: 0, 
        check: function({player, game}){
            return this.achieved || player.top <= game.top;
        } 
    },
    { id: 8, title: 'Me gusta', description: 'Jugar durante 1 minuto', achieved: false , left: 0, top: 0, 
        check: () => timer >= 60
    },
    { id: 9, title: 'Adictivo', description: 'Jugar durante 20 minutos', achieved: false , left: 0, top: 0, 
        check: () => timer >= 1200
    },
    { id: 10, title: '????', description: 'Muy escondido', achieved: false , left: 950, top: 550,
        check: function({player, game}) {
            return this.achieved ||
            player.bottom === game.bottom && player.right === (game.right - 30)
        } 
    },
    { id: 11, title: 'Upss', description: 'Muere 1 vez', achieved: false , left: 0, top: 0, check: ()=> diedCounter > 0},

];

// incrementa el timer cada 1 seg
setInterval(() => {
    // console.log(player.getBoundingClientRect())
    // draw time on the screen element #timer b with format 00:00:00
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;
    document.querySelector('#timer b').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    timer++;
}, 1000);

function drawAchievements() {
    // delete all previous achievements
    document.querySelectorAll('.achievement').forEach(a => a.remove());

    achievementList.filter(a => !a.achieved).forEach(data => {
        const achievement = document.createElement('div');
        achievement.classList.add('achievement');
        achievement.classList.add(`achievement-${data.id}`);
        achievement.style.left = `${data.left}px`;
        achievement.style.top = `${data.top}px`;
        achievement.style.height = `${data.height}px`;
        achievement.style.width = `${data.width}px`;
        game.appendChild(achievement);
    });

    drawAchievementList();
}

function checkAchievementCollision() {
    const playerRect = player.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();

    achievementList.filter(a => !a.achieved).forEach(data => {
        const achievementRaw = document.querySelector(`.achievement.achievement-${data.id}`);

        if(achievementRaw) {
            const achievementRect = achievementRaw.getBoundingClientRect();
            if(data.check({player: playerRect, game: gameRect}, achievementRect)){
                data.achieved = true;
            }
        }
    });

    const saltarin = achievementList.find(a => a.id === 2);
    if(!saltarin.achieved && jumpCounter >= 10) {
        saltarin.achieved = true;
    }

    drawAchievements();
}

// Using the list of achievements, create an element on the UI for each one
function drawAchievementList() {
    // delete all previous achievements
    document.querySelectorAll('.achievement-item').forEach(a => a.remove());

    // Draw a p element inside '.achievement-container' for each achievement
    achievementList.forEach(data => {
        const achievementContainer = document.querySelector('.achievement-container');
        const achievement = document.createElement('p');
        achievement.classList.add('achievement-item');
        achievement.textContent = `${data.title} - ${data.description}`;
        achievement.style.textDecoration = data.achieved ? 'line-through' : 'none';

        if(data.achieved) {
            achievement.style.color = 'green';
        }
        // add description below
        achievementContainer.appendChild(achievement);
    });
    
}

function checkForWin() {
    if (achievementList.every(a => a.achieved)) {
        alert('¡Has ganado!');
    }
}