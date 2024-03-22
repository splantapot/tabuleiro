for (let y = 0; y < placeNumbers; y++) {
    for (let x = 0; x < placeNumbers; x++) {
        let color = (x+y)%2==0? 'rgba(190,190,190,0.0)':'rgb(100,100,100,0.25)';
        places.push(new Place(`${x+(y*placeNumbers)}_place`, placeSize/placeNumbers, color, x, y));
    }
}

makeCards(`
    Zumbí dos Palmares/80/150/+/2;
    Esperança Garcia/60/200/+/4;
    Edson Arantes (Pelé)/90/150/x/2;
    Dom Pedro II/50/130/x/4;
    Machado de Assis/70/100/*/2;
    Tarsila do Amaral/80/130/*/4;
    Getúlio Vargas/80/100/+/2;
    Carmem Miranda/80/160/*/4 
`, 'Brasil');

requestAnimationFrame(fps);
function fps() {
    requestAnimationFrame(fps);

    if (selected.editPlaces != null) {
        let classToAdd;
        switch (game.phase) {
            case 0:
                classToAdd = 'moverange';
            break;
            case 1:
                classToAdd = 'atkrange';
            break;
        }
        for(let edit of selected.editPlaces) {
            if (places[edit] != undefined) {
                places[edit].div.classList.add(classToAdd);
            }
        }
    }

    document.getElementById('id_view').innerHTML = `S.id: ${selected.id}`;
    document.getElementById('org_view').innerHTML = `S.og: ${selected.origin}`
    const len = selected.editPlaces == null? 0 : selected.editPlaces.length
    document.getElementById('range_view').innerHTML = `S.rng: ${selected.editPlaces} (${len})`
    document.getElementById('turn_view').innerHTML = `T.sts: ${game.phase}`
    document.getElementById('act_view').innerHTML = `T.acs: ${game.turnActs}`
}