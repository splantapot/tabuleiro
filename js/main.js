for (let y = 0; y < placeNumbers; y++) {
    for (let x = 0; x < placeNumbers; x++) {
        let color = (x+y)%2==0? 'rgba(190,190,190,0.0)':'rgb(100,100,100,0.25)';
        places.push(new Place(`${x+(y*placeNumbers)}_place`, placeSize/placeNumbers, color, x, y));
    }
}

makeCards(`
    Zumbí dos Palmares/80/150;
    Esperança Garcia/60/200;
    Edson Arantes (Pelé)/90/150;
    Dom Pedro II/50/130;
    Machado de Assis/70/100;
    Tarsila do Amaral/80/130;
    Getúlio Vargas/80/100;
    Carmem Miranda/80/160  
`, 'Brasil');

requestAnimationFrame(fps);
function fps() {
    requestAnimationFrame(fps);

    for (let plc of places) {
        if (plc.cardIn == null) {
            plc.div.style.backgroundColor = plc.color;
        } else {
            plc.div.style.backgroundColor = 'rgb(255,0,0)';
        }
    }

    document.getElementById('id_view').innerHTML = `S.id: ${selected.id}`;
    document.getElementById('org_view').innerHTML = `S.og: ${selected.origin}`  
}