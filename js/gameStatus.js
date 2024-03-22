/*Fases:
0 = mover
1 = atacar
2 = acordos
*/
const game = {
    phase:0,
    phaseMax:1,
    phaseTitle:'Fase de Movimento',
    turnActs:0
}

function proxFase() {
    if (selected.id == null) {
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
}

function resetTurno() {
    game.phase = 0;
    game.turnActs = 0;
}