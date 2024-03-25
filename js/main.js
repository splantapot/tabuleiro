for (let y = 0; y < placeNumbers; y++) {
    for (let x = 0; x < placeNumbers; x++) {
        let color = (x+y)%2==0? 'rgba(190,190,190,0.0)':'rgb(100,100,100,0.25)';
        places.push(new Place(`${x+(y*placeNumbers)}_place`, placeSize/placeNumbers, color, x, y));
    }
}

players.push(new Player('China'));
players.push(new Player('Angola'));
players.push(new Player('Brasil'));
game.turnPlayerMax = players.length-1;
game.turnMax = 3;

makeCards(`
    Abel Epalanga/105/95/+/1;
    Lúcio Lara/120/80/x/2;
    Zacarias Kamwenho/130/70/x/2;
    Laurinda Cardoso/75/125/+/1;
    Jonas Savimbi/140/80/*/3;
    Eduardo Santos/115/75/+/1;
    Deolinda Rodrigues/105/95/+/2;
    Agostinho Neto/130/90/*/3
`, 'Angola');
makeCards(`
    Zumbi dos Palmares/115/90/+/3;
    Esperança Garcia/120/110/x/2;
    Edson Arantes (Pelé)/145/70/+/3;
    Dom Pedro II/110/140/*/2;
    Machado de Assis/135/90/+/1;
    Tarsila do Amaral/105/150/x/1;
    Getúlio Vargas/130/110/x/2;
    Carmem Miranda/120/140/x/1
`, 'Brasil');
makeCards(`
    Hua Mulan/125/120/+/3;
    Sun-Hui/90/145/x/3;
    Lin Siniang/135/125/x/2;
    Yang Kaihui/100/130/+/3;
    Qin Shi Huang/150/80/*/2;
    Confúcio/125/100/x/3;
    Jackie Chan/130/100/+/2;
    Sun Yat Sen/120/100/+/2
`, 'China');
makeCards(`
    Antônio Escobar/120/80/+/2;
    Margarita Salas/115/130/+/3;
    Ángel larrazabal/145/90/x/2;
    RosalÍa Vila Tobella/100/140/+/2;
    Ernst Lindermann/130/100/x/1;
    Salvador Dali/90/140/+/2;
    Mariana Pineda/110/120/x/1;
    Marc Marquez/120/120/+/2
`, 'Espanha');
makeCards(`
    George Washington/125/80/*/3;
    Martin Luther King/130/90/*/3;
    Abraham Lincoln/115/60/+/2;
    Bessie Coleman/90/100/x/1;
    Rosa Parks/90/85/+/1;
    Jhon Kennedy/135/100/+/2;
    Barack Obama/150/110/*/3;
    Sarah Breedlove/95/125/x/1
`, 'EstadosUnidos');
makeCards(`
    Winston Leonard Spencer/120/100/+/1;
    Benjamin Netanyahu/130/110/+/1;
    Soulika Hajouel/100/150/x/2;
    Sarah Schenirer/90/140/x/2;
    Tzip Livni/125/120/+/3;
    Yitzhak Rabin/145/100/+/1;
    Haim Weizmann/130/130/*/2;
    Golda Meir/130/100/x/3
`, 'Israel');
makeCards(`
    Winston Leonard Spencer/145/85/+/2;
    Isambard Kingdom/115/100/x/1;
    Charles Darwin/125/115/+/1;
    Diana Princesa/90/145/x/2;
    Issac Newton/120/110/+/3;
    Stephen William Hawking/100/135/+/2;
    Elizabeth II/135/110/x/1;
    Oliver Cromwell/120/100/+/3
`, 'ReinoUnido');
makeCards(`
    Grigori Rasputin/100/150/+/2;
    Sofia Ramonov/120/100/x/2;
    Alexander suvarove/140/95/+/1;
    Vera Mukhina/120/135/x/1;
    Igor kurchatov/130/100/x/1;
    Valentina Tereshkova/120/120/+/2;
    Pedro o grande/155/70/*/2;
    Sofia kovalevskaya/115/130/+/3
`, 'Russia');

requestAnimationFrame(fps);
function fps() {
    if (game.turnNow <= game.turnMax) {
        requestAnimationFrame(fps);
    } else {
        game.isOver = true;
        console.log('Game overr');
        //When game is over
        for (const player of players) {
            for (const card of cards) {
                if (card.inGame && card.deck == player.deck) {
                    //Setup
                    console.log(`a ${card.deck} card in game`);
                    selected.editPlaces = [];
                    const org = parseInt(card.div.parentElement.id.split('_')[0]);
                    const maxX = org-(org%placeNumbers)+placeNumbers-1;
                    const minX = org-(org%placeNumbers);
                    selected.editPlaces = [];
                    const add = {
                        x:0,
                        y:0
                    }
                    //Spawn inn +
                    for(let dir = 0; dir < 4; dir++) {
                        add.x = Math.round(Math.cos(dir*Math.PI/2));
                        add.y = Math.round(Math.sin(dir*Math.PI/2));
                        for (let m = 1; m<=card.moveRng; m++) {
                            const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                            if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length) && 
                                !(selected.editPlaces.includes((add.x*m)+(add.y*m*placeNumbers)+org))) {
                                selected.editPlaces.push((add.x*m)+(add.y*m*placeNumbers)+org)
                            }
                        }
                    }
                    //Spawn in x
                    for(let dir = 0; dir < 4; dir++) {
                        add.x = (dir*Math.PI/2)+(Math.PI/4)
                        add.x = Math.round(Math.cos(add.x));
                        add.y = Math.round(Math.sin((dir*Math.PI/2)+(Math.PI/4)));
                        for (let m = 1; m<=card.moveRng-1; m++) {
                            const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                            if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length) && 
                            !(selected.editPlaces.includes((add.x*m)+(add.y*m*placeNumbers)+org))) {
                                selected.editPlaces.push((add.x*m)+(add.y*m*placeNumbers)+org)
                            }
                        }
                    }
                    //Spawn in self
                    if (!(selected.editPlaces.includes(org))) {
                        selected.editPlaces.push(org);
                    }
                    spotRange(true, card);
                }
            }
        }

        setTimeout(() => {
            endGame.style.width = '100%'
        }, 5000);
        setTimeout(() => {
            window.location.href = 'fim.html';
        }, 1000); 
    }
    
    cards.forEach((c,ix) => {
        if (c.deck != players[game.turnPlayer].deck && !c.inGame) {
            cards[ix].div.style.display = 'none';
        } else {
            cards[ix].div.style.display = 'inline-block';
        }
    });

    if (game.turnActs >= 2) {
        proxFase();
    }

    document.getElementById('id_view').innerHTML = `S.id: ${selected.id}`;
    document.getElementById('org_view').innerHTML = `S.og: ${selected.origin}`
    const len = selected.editPlaces == null? 0 : selected.editPlaces.length
    document.getElementById('range_view').innerHTML = `S.rng: ${selected.editPlaces} (${len})`
    // document.getElementById('turn_view').innerHTML = `T.sts: ${game.phase}`
    document.getElementById('act_view').innerHTML = `T.plr: ${players[game.turnPlayer].deck}`
}