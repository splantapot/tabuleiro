/*  Movement types:

x - Bispo
+ - Torre
o - Area
* - Rainha

Alcance: 1 a 5;

*/

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
    elmnt.onmouseenter = onMouseMove
    
    function onMouseMove(e) {
        e == e || window.event;
        e.preventDefault();
        
        if(elmnt.localName == 'div') {
            elmnt = (elmnt.children[0]);
        }

        const finalPos = {
            x: Math.round(elmnt.getBoundingClientRect().x),
            y: Math.round(elmnt.getBoundingClientRect().y),
            w: Math.round(elmnt.getBoundingClientRect().width),
            h: Math.round(elmnt.getBoundingClientRect().height)
        };

        cardView.style.display = selected.id==null? 'block' : 'none';
        cardView.style.left = `${finalPos.x - cardView.clientWidth-10}px`;
        cardView.style.top = `${finalPos.y/4}px`;

        const imgView = cardView.children[0];
        if (imgView.classList.contains('imgCartaView')) {
            imgView.classList.add('imgCartaView');
        }
        imgView.src = elmnt.src;

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

        if (selected.id == null) {
            selected.id = parseInt(e.target.id.split('_')[0]);
            selected.time = new Date().getTime();
            selected.origin = document.getElementById(selected.id+'_carta').offsetParent.id;
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.add('select');

            if (document.getElementById(selected.origin).classList.contains('place')) {
                switch (cardSelected.moveType) {
                    case '+':
                        selected.editPlaces = [];
                        for(let dir = 0; dir < 4; dir++) {
                            const x = [-1, 0, 1, 0];
                            const y = [0, 1, 0, -1];
                            for (let m = cardSelected.moveRng; m > 0; m--) {
                                const org = parseInt(selected.origin.split('_')[0]);
                                selected.editPlaces.push((x[dir]*m)+((y[dir]*m)*placeNumbers)+org)
                            }
                        }
                    break;
                }
            }
        }

        if (new Date().getTime()-selected.time>180 && selected.id != null && (
            (selected.id == parseInt(elmnt.id.split('_')[0])) ||
            (selected.id != elmnt.id && elmnt.classList.contains('card'))
            )){
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.remove('select');
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