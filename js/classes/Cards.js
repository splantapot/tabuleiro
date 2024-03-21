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

        this.cardScale = (1080/1650); // =~ 0.6545

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
    console.log(cards);
}

function viewCard(elmnt = document.getElementById('elmnt')) {
    const cardView = document.getElementById('cardView');
    const cardLabels = document.getElementById('cardLabels');

    elmnt.onmouseenter = onMouseMove
    
    function onMouseMove(e) {
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

        cardView.style.display = selected.id==null? 'block' : 'none';
        cardView.style.left = `${finalPos.x - cardView.clientWidth-10}px`;
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

function cardSelectable(elmnt = document.getElementById('elmnt')) {
    elmnt.onmousedown = onMouseDown;

    function onMouseDown(e) {
        e == e || window.event;
        e.preventDefault();
        
        //Movement
        if (selected.id == null && game.phase == 0) {
            selected.id = parseInt(e.target.id.split('_')[0]);
            selected.time = new Date().getTime();
            selected.origin = document.getElementById(selected.id+'_carta').offsetParent.id;
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.add('select');
            
            if (document.getElementById(selected.origin).classList.contains('place')) {
                const org = parseInt(selected.origin.split('_')[0]);
                const maxX = org-(org%placeNumbers)+placeNumbers-1;
                const minX = org-(org%placeNumbers);
                selected.editPlaces = [];
                const add = {
                    x:0,
                    y:0
                }
                switch (cardSelected.moveType) {
                    case '+':
                        for(let dir = 0; dir < 4; dir++) {
                            add.x = Math.round(Math.cos(dir*Math.PI/2));
                            add.y = Math.round(Math.sin(dir*Math.PI/2));
                            for (let m = 1; m<=cardSelected.moveRng; m++) {
                                const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                                if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length)) {
                                    selected.editPlaces.push((add.x*m)+(add.y*m*placeNumbers)+org)
                                }
                            }
                        }
                    break;

                    case 'x':
                        for(let dir = 0; dir < 4; dir++) {
                            add.x = Math.round(Math.cos((dir*Math.PI/2)+(Math.PI/4)));
                            add.y = Math.round(Math.sin((dir*Math.PI/2)+(Math.PI/4)));
                            for (let m = 1; m<=cardSelected.moveRng; m++) {
                                const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                                if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length)) {
                                    selected.editPlaces.push((add.x*m)+(add.y*m*placeNumbers)+org)
                                }
                            }
                        }
                        break;
                        
                        case '*':
                            for(let dir = 0; dir < 8; dir++) {
                                add.x = Math.round(Math.cos(dir*Math.PI/4));
                            add.y = Math.round(Math.sin(dir*Math.PI/4));
                            for (let m = 1; m<=cardSelected.moveRng; m++) {
                                const posGain = ((add.x*m)+(add.y*m*placeNumbers)+org);
                                if ((posGain >= 0 && ((add.x*m)+org)<=maxX) && (((add.x*m)+org)>=minX) && (posGain<=places.length)) {
                                    selected.editPlaces.push((add.x*m)+(add.y*m*placeNumbers)+org)
                                }
                            }
                        }
                        break;
                    }
                }
            }
            
            //Attack
            if (selected.id == null && game.phase == 1) {
                selected.id = parseInt(e.target.id.split('_')[0]);
            selected.time = new Date().getTime();
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.add('atk');
        }
        if (selected.id != null && game.phase == 1 && selected.id != parseInt(e.target.id.split('_')[0])) {
            const targetId = parseInt(e.target.id.split('_')[0]);
            const targetCard = cards[targetId];
            const atackerCard = cards[selected.id]
            const dmgType = Math.sign(atackerCard.power-targetCard.power);
            const dmgLabel = document.getElementById('boardDmg');
            console.log(`${atackerCard.name} atk -> ${targetCard.name} (${dmgType})` );
            let finalPos;
            
            switch (dmgType) {
                case 1:
                    finalPos = {
                        x: Math.round(targetCard.div.getBoundingClientRect().x),
                        y: Math.round(targetCard.div.getBoundingClientRect().y),
                        w: Math.round(targetCard.div.getBoundingClientRect().width),
                        h: Math.round(targetCard.div.getBoundingClientRect().height)
                    };
                    dmgLabel.innerHTML = `-${atackerCard.power-targetCard.power}`;
                    dmgLabel.style.left = `${finalPos.x-finalPos.w}px`;
                    dmgLabel.style.top = `${finalPos.y}px`;
                    dmgLabel.style.display = 'block';
                    dmgLabel.classList.add('dmgUp');
                    targetCard.life -= (atackerCard.power-targetCard.power);
                    targetCard.div.classList.add('dmgTake');

                break;
                case -1:
                    finalPos = {
                        x: Math.round(atackerCard.div.getBoundingClientRect().x),
                        y: Math.round(atackerCard.div.getBoundingClientRect().y),
                        w: Math.round(atackerCard.div.getBoundingClientRect().width),
                        h: Math.round(atackerCard.div.getBoundingClientRect().height)
                    };
                    dmgLabel.innerHTML = `-${targetCard.power-atackerCard.power}`;
                    dmgLabel.style.left = `${finalPos.x-finalPos.w}px`;
                    dmgLabel.style.top = `${finalPos.y}px`;
                    dmgLabel.style.display = 'block';
                    dmgLabel.classList.add('dmgUp');
                    atackerCard.life -= (targetCard.power-atackerCard.power);
                    atackerCard.div.classList.add('dmgTake');
                break;
            }

            setTimeout(() => {
                atackerCard.div.classList.remove('dmgTake');
                targetCard.div.classList.remove('dmgTake');
                dmgLabel.classList.remove('dmgUp');
                dmgLabel.style.display = 'none'
            }, 999);
            defaultClean();
        }
        
        if (new Date().getTime()-selected.time>180 && selected.id != null && (
            (selected.id == parseInt(elmnt.id.split('_')[0])) ||
            (selected.id != elmnt.id && elmnt.classList.contains('card') && game.phase==0)
            )){
                defaultClean();
            }

            
        function defaultClean() {
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.remove('select');
            cardSelected.div.classList.remove('atk')
            selected.id = null;
            selected.time = new Date().getTime();
            selected.origin = null;
            if (selected.editPlaces != null) {
                for(let edit of selected.editPlaces) {
                    if (places[edit] != undefined) {
                        places[edit].div.classList.remove('moverange');
                    }
                }
                selected.editPlaces = null;
            }
        }
        elmnt. onmouseup = onMouseUp;
    };

    function onMouseUp(e) {
        elmnt.onmouseup = null;
    }
}