/*Movement types:

x - Bispo
+ - Torre
* - Rainha

Alcance: 1 a 5;*/

class Cards {
    constructor(id, deck, name, power, life, moveType, moveRng) {
        this.id = id;
        this.deck = deck;
        this.name = name;
        this.life = life;
        this.power = power;
        this.moveType = moveType;
        this.moveRng = moveRng;
        this.isLive = true;
        this.maxLife = life;
        this.inGame = false;
        this.tregua = null;

        // =~ 0.6545, Const de proporção da carta
        this.cardScale = (1080/1650); 

        //Damage
        this.damage = (dam) => {
            this.life -= dam
            this.div.classList.add('dmgTake');
            setTimeout(() => {
                if (this.life <= 0) {
                    this.life = 0;
                    this.isLive = false;
                    this.img.style.filter = 'grayscale(100%)';
                }
            }, 400);
        }

        //  Creating card div
        let newPlace = document.createElement('div');
        newPlace.id = id;
        newPlace.classList.add('card');

        let imagemCarta = document.createElement('img');
        imagemCarta.id = `${id}Img`;
        imagemCarta.classList.add('imgCarta');
        imagemCarta.src = `../cartas/${id}.jpg`
        
        viewCard(imagemCarta);
        viewCard(newPlace);

        cardSelectable(imagemCarta);
        cardSelectable(newPlace);

        newPlace.appendChild(imagemCarta);
        cardBox.appendChild(newPlace);
        

        this.div = newPlace;
        this.img = imagemCarta;
    }
}

function makeCards(str = '', deck = '') {
    let cartText = str.trim().split(';');
    cartText.forEach((cardText) => {
        cards.push(new Cards(
            `${cards.length}_carta`, //id
            deck, //Deck
            cardText.trim().split('/')[0], //Name
            parseInt((cardText.trim().split('/')[1])), //Power
            parseInt((cardText.trim().split('/')[2])), //Life
            cardText.trim().split('/')[3], //Move type
            parseInt(cardText.trim().split('/')[4])//MoveRange
        ))
    });
    let idx;
    players.forEach((e,ix) => {
        if (e.deck == deck) {
            idx = ix;
        }
    });
}

function viewCard(elmnt = document.getElementById('elmnt')) {
    const cardView = document.getElementById('cardView');
    const cardLabels = document.getElementById('cardLabels');

    elmnt.onmouseenter = onMouseEnter
    cardView.onmouseleave = onMouseLeave
    
    function onMouseEnter(e) {
        e == e || window.event;
        e.preventDefault();

        if(elmnt.localName == 'div') {
            elmnt = (elmnt.children[0]);
        }
        const cardId = parseInt(elmnt.id.trim().split('_')[0]);
        const finalPos = {
            x: Math.round(elmnt.getBoundingClientRect().x),
            y: Math.round(elmnt.getBoundingClientRect().y),
            w: Math.round(elmnt.getBoundingClientRect().width),
            h: Math.round(elmnt.getBoundingClientRect().height)
        };

        cardView.style.filter = cards[cardId].isLive? 'none' : 'grayscale(100%)';
        cardView.style.display = selected.id==null? 'block' : 'none';
        cardView.style.left =  finalPos.x - cardView.clientWidth-10>0? `${finalPos.x - cardView.clientWidth-10}px`: 
            `${finalPos.x+50}px`;
        cardView.style.top = `${finalPos.y/4}px`;

        const imgView = document.getElementById('cardViewImg');
        imgView.classList.add('imgCardView');
        imgView.src = elmnt.src;

        cardLabels.style.width = '95%'
        cardLabels.style.position = 'absolute';
        cardLabels.style.left = '50%';
        cardLabels.style.transform = 'translate(-50%,0%)';

        cardLabels.children[0].innerHTML = `Poder: ${cards[cardId].power}`
        cardLabels.children[1].innerHTML = `Vida: ${cards[cardId].life}`
        cardLabels.children[2].innerHTML = `Mover: ${cards[cardId].moveRng}`
        
        elmnt.onmouseleave = onMouseLeave;
        elmnt.onmousedown = onMouseLeave;
    }

    function onMouseLeave(e) {
        cardView.style.display = 'none';
        elmnt.onmousemove = null; 
    }
}

const selected = {
    id: null,
    time: 0,
    origin: null,
    editPlaces: null
}

function spotRange() {
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
            if (places[edit] != undefined && classToAdd != undefined) {
                places[edit].div.classList.add(classToAdd);
            }
        }
    }
}

function cardSelectable(elmnt = document.getElementById('elmnt')) {
    elmnt.onmousedown = onMouseDown;

    function onMouseDown(e) {
        e == e || window.event;
        e.preventDefault();
        
        const targetId = parseInt(e.target.id.split('_')[0]);
        
        //Movement
        if (selected.id == null && game.phase == 0 && cards[targetId].isLive && game.turnActs < 2  && cards[targetId].deck == players[game.turnPlayer].deck) {
            selected.id = targetId;
            selected.time = new Date().getTime();
            selected.origin = document.getElementById(selected.id+'_carta').offsetParent.id;
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.add('select');
            genMap(cardSelected);
            spotRange();
        }
        
        //Attack
        if (selected.id == null && game.phase == 1 && document.getElementById(targetId + '_carta').offsetParent.id != 'cardBox' && cards[targetId].isLive && game.turnActs < 2 && cards[targetId].deck == players[game.turnPlayer].deck) {
            selected.id = targetId;
            selected.time = new Date().getTime();
            selected.origin = document.getElementById(selected.id+'_carta').offsetParent.id;
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.add('atk');
            genMap(cardSelected);
            spotRange();
        }
        if (selected.id != null && game.phase == 1 && selected.id != targetId && cards[targetId].isLive && document.getElementById(targetId + '_carta').offsetParent.classList.contains('atkrange')) {
            const dmgType = Math.sign(cards[selected.id].power-cards[targetId].power);
            const dmgLabel = document.getElementById('boardDmg');
            const dmgCard = {
                c1: 0,
                c2: 0,
                dmg: 0,
                ix1:0,
                ix2:0
            }

            switch (dmgType) {
                case -1:
                    dmgCard.c1 = cards[targetId];
                    dmgCard.c2 = cards[selected.id];
                    dmgCard.ix1 = targetId;
                    dmgCard.ix2 = selected.id;
                break;
                default: //selecionado > alvo
                    dmgCard.c1 = cards[selected.id];
                    dmgCard.c2 = cards[targetId];
                    dmgCard.ix2 = targetId;
                    dmgCard.ix1 = selected.id;
                break;

            }

            const finalPos = {
                x: Math.round(dmgCard.c2.div.offsetParent.getBoundingClientRect().left),
                y: Math.round(dmgCard.c2.div.offsetParent.getBoundingClientRect().top),
                w: Math.floor(dmgCard.c2.div.offsetParent.getBoundingClientRect().width),
                h: Math.floor(dmgCard.c2.div.offsetParent.getBoundingClientRect().height),
            }
            dmgCard.dmg = dmgCard.c2.life-(dmgCard.c1.power-dmgCard.c2.power)>0?(dmgCard.c1.power-dmgCard.c2.power):dmgCard.c2.life;
            dmgLabel.style.display = 'block';
            dmgLabel.style.left = `${finalPos.x}px`;
            dmgLabel.style.top = `${finalPos.y}px`;
            dmgLabel.innerHTML = `-${dmgCard.dmg}`;
            dmgLabel.classList.add('dmgUp');

            dmgCard.c2.damage(dmgCard.dmg);
            cards[dmgCard.ix1] = dmgCard.c1;
            cards[dmgCard.ix2] = dmgCard.c2;

            setTimeout(() => {
                dmgCard.c1.div.classList.remove('dmgTake');
                dmgCard.c2.div.classList.remove('dmgTake');
                dmgLabel.classList.remove('dmgUp');
                dmgLabel.style.display = 'none';
                game.turnActs++;
            }, 999);
            defaultClean();
            cleanRangeList();
        }

        //Reset
        if (new Date().getTime()-selected.time>180 && selected.id != null && (
            (selected.id == parseInt(elmnt.id.split('_')[0])) ||
            (selected.id != elmnt.id && elmnt.classList.contains('card') && game.phase==0)
            )){
                defaultClean();
                cleanRangeList();
        }

        //Funcs
        function genMap(genCardSelected) {
            if (document.getElementById(selected.origin).classList.contains('place')) {
                const org = parseInt(selected.origin.split('_')[0]);
                const maxX = org-(org%placeNumbers)+placeNumbers-1;
                const minX = org-(org%placeNumbers);
                selected.editPlaces = [];
                const add = {
                    x:0,
                    y:0
                }
                //Regras padrão
                switch (genCardSelected.moveType) {
                    case '+':
                        for(let dir = 0; dir < 4; dir++) {
                            add.x = Math.round(Math.cos(dir*Math.PI/2));
                            add.y = Math.round(Math.sin(dir*Math.PI/2));
                            for (let m = 1; m<=genCardSelected.moveRng; m++) {
                                const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                                if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length) && 
                                    !(selected.editPlaces.includes((add.x*m)+(add.y*m*placeNumbers)+org))) {
                                    selected.editPlaces.push((add.x*m)+(add.y*m*placeNumbers)+org)
                                }
                            }
                        }
                        break;
    
                    case 'x':
                        for(let dir = 0; dir < 4; dir++) {
                            add.x = Math.round(Math.cos((dir*Math.PI/2)+(Math.PI/4)));
                            add.y = Math.round(Math.sin((dir*Math.PI/2)+(Math.PI/4)));
                            for (let m = 1; m<=genCardSelected.moveRng; m++) {
                                const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                                if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length) && 
                                !(selected.editPlaces.includes((add.x*m)+(add.y*m*placeNumbers)+org))) {
                                    selected.editPlaces.push((add.x*m)+(add.y*m*placeNumbers)+org)
                                }
                            }
                        }
                    break;
                            
                    case '*':
                        for(let dir = 0; dir < 8; dir++) {
                            add.x = Math.round(Math.cos(dir*Math.PI/4));
                            add.y = Math.round(Math.sin(dir*Math.PI/4));
                            for (let m = 1; m<=genCardSelected.moveRng; m++) {
                                const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                                if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length) && 
                                !(selected.editPlaces.includes((add.x*m)+(add.y*m*placeNumbers)+org))) {
                                    selected.editPlaces.push((add.x*m)+(add.y*m*placeNumbers)+org)
                                }
                            }
                        }
                    break;
                }             
            }
        }

        function defaultClean() {
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.remove('select');
            cardSelected.div.classList.remove('atk');
            cardSelected.div.classList.remove('peace');
            selected.id = null;
            selected.time = new Date().getTime();
            selected.origin = null;
        }
        elmnt. onmouseup = onMouseUp;
    };

    function onMouseUp(e) {
        elmnt.onmouseup = null;
    }
}

function genMapAcordos(genCardSelected, deck) {
    if (genCardSelected.div.parentElement.classList.contains('place')) {
        const org = parseInt(genCardSelected.div.parentElement.id.split('_')[0]);
        const maxX = org-(org%placeNumbers)+placeNumbers-1;
        const minX = org-(org%placeNumbers);
        const add = {
            x:0,
            y:0
        }
        //case '+':
        for(let dir = 0; dir < 4; dir++) {
            add.x = Math.round(Math.cos(dir*Math.PI/2));
            add.y = Math.round(Math.sin(dir*Math.PI/2));
            for (let m = 1; m<=Math.ceil(genCardSelected.moveRng*genCardSelected.life/genCardSelected.maxLife); m++) {
                const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length) && 
                    !(selected.editPlaces.includes((add.x*m)+(add.y*m*placeNumbers)+org))) {
                    selected.editPlaces.push({pos:(add.x*m)+(add.y*m*placeNumbers)+org, deck: deck})
                }
            }
        }
        //case 'x':
        for(let dir = 0; dir < 4; dir++) {
            add.x = Math.round(Math.cos((dir*Math.PI/2)+(Math.PI/4)));
            add.y = Math.round(Math.sin((dir*Math.PI/2)+(Math.PI/4)));
            for (let m = 1; m<=Math.ceil(genCardSelected.moveRng*genCardSelected.life/genCardSelected.maxLife)-1; m++) {
                const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length) && 
                !(selected.editPlaces.includes((add.x*m)+(add.y*m*placeNumbers)+org))) {
                    selected.editPlaces.push({pos:(add.x*m)+(add.y*m*placeNumbers)+org, deck: deck})
                }
            }
        }
        if (!(selected.editPlaces.includes(org))) {
            selected.editPlaces.push({pos:org, deck: deck})
        }
        selected.editPlaces.forEach((e = {pos:0, deck:''}) => {
            if (places[e.pos].div.className.includes('m') && 
                !places[e.pos].div.className.includes(`m${players[game.turnPlayer].deck}`)) {
                places[e.pos].div.className = 'place';
            } else {
                places[e.pos].div.classList.add(`m${e.deck}`);
            }
        });
    }
}