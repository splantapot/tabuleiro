/*Fases:
0 = mover
1 = atacar
2 = acordos
*/
const game = {
    phase:0,
    turnActs:0,
    phaseTitle:'Fase de Movimento'
}

function proxFase() {
    game.phase++;
    if (game.phase >= 2) {
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
}