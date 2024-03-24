/*Fases:
0 = mover
1 = atacar
2 = acordos
*/
let places = [];
let cards = [];
let players = [];
const paises = ['Angola','Brasil','China','Espanha','EstadosUnidos','Israel','ReinoUnido','Russia'];
const game = {
    phase:0,
    phaseMax:1,
    phaseTitle:'Fase de Movimento',
    turnPlayer:0,
    turnPlayerMax:1,
    turnActs:0
}

function proxFase() {
    game.phase++;
    game.turnActs = 0;
    if (game.phase > game.phaseMax) {
        game.phase = 0;
        game.turnPlayer = (game.turnPlayer+1 <= game.turnPlayerMax)? game.turnPlayer+1 : 0;
    }
    resetSelections();
    
    switch (game.phase) {
        case 0:
            game.phaseTitle = 'Fase de Movimento'
            if (selected.editPlaces != null) {
                if (typeof selected.editPlaces[0] != Number) {
                    selected.editPlaces.forEach((e = {pos:0, deck:''}) => {
                        let x = e.pos;
                        document.getElementById(places[x].id).className = 'place';
                    });
                }
                cleanRangeList();
            }
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

function resetSelections() {
    if (selected.id != null) {
        cards[selected.id].div.classList.remove('select');
        cards[selected.id].div.classList.remove('atk');
        cards[selected.id].div.classList.remove('peaces');
        selected.id = null;
        selected.time = new Date().getTime();
        selected.origin = null;
        cleanRangeList();
    }
}