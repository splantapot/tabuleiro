/*Fases:
0 = mover
1 = atacar
2 = acordos
*/
const game = {
    phase:0,
    phaseMax:2,
    phaseTitle:'Fase de Movimento',
    turnActs:0,
    turnPlayer:0,
    turnPlayerMax:0
}

function proxFase() {

    if (selected.id != null) {
        cards[selected.id].div.classList.remove('select');
        cards[selected.id].div.classList.remove('atk');
        selected.id = null;
        selected.id = null;
        selected.time = new Date().getTime();
        selected.origin = null;
        cleanRangeList();
    }

    game.phase++;
    if (game.phase > game.phaseMax) {
        resetTurno();
    }
    
    switch (game.phase) {
        case 0:
            game.phaseTitle = 'Fase de Movimento'
        break;
        case 1:
            game.phaseTitle = 'Fase de Ataque'
        break;
        case 2:
            game.phaseTitle = 'Fase de Acordos'
        break;
    }
    document.getElementById('boardPhase').innerHTML = game.phaseTitle;
}

function resetTurno() {
    game.phase = 0;
    game.turnActs = 0;
    game.turnPlayer = game.turnPlayer+1<=game.turnPlayerMax? game.turnPlayer+1 : 0;
    //  1: -game.turnPlayer;
}