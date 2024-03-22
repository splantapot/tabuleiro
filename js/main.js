for (let y = 0; y < placeNumbers; y++) {
    for (let x = 0; x < placeNumbers; x++) {
        let color = (x+y)%2==0? 'rgba(190,190,190,0.0)':'rgb(100,100,100,0.25)';
        places.push(new Place(`${x+(y*placeNumbers)}_place`, placeSize/placeNumbers, color, x, y));
    }
}

players.push(new Player('Brasil'));
players.push(new Player('EstadosUnidos'));

makeCards(`
    Zumbí dos Palmares/80/25/+/2;
    Esperança Garcia/60/200/+/4;
    Edson Arantes (Pelé)/90/150/x/2;
    Dom Pedro II/50/130/x/4;
    Machado de Assis/70/100/*/2;
    Tarsila do Amaral/80/130/*/4;
    Getúlio Vargas/80/100/+/2;
    Carmem Miranda/80/160/*/4 
`, 'Brasil');

makeCards(`
    George Washington/90/140/+/2;
    Martin Luther King/120/70/*/1;
    Abraham Lincoln/120/90/x/3;
    Bessie Coleman/80/135/*/2;
    Rosa Parks/120/80/+/1;
    Jhon Kennedy/90/120/*/3;
    Barack Obama/100/140/+/2;
    Sarah Breedlove/80/110/x/1
`, 'EstadosUnidos');

requestAnimationFrame(fps);
function fps() {
    requestAnimationFrame(fps);

    cards.forEach((c,ix) => {
        if (c.deck != players[game.turnPlayer].deck && !c.inGame) {
            cards[ix].div.style.display = 'none';
        } else {
            cards[ix].div.style.display = 'inline-block';
        }
    });

    // document.getElementById('id_view').innerHTML = `S.id: ${selected.id}`;
    // document.getElementById('org_view').innerHTML = `S.og: ${selected.origin}`
    // const len = selected.editPlaces == null? 0 : selected.editPlaces.length
    // document.getElementById('range_view').innerHTML = `S.rng: ${selected.editPlaces} (${len})`
    // document.getElementById('turn_view').innerHTML = `T.sts: ${game.phase}`
    // document.getElementById('act_view').innerHTML = `T.plr: ${players[game.turnPlayer].deck}`
}