let cards = [];

class Cards {
    constructor(id, deck, name,power, life) {
        this.id = id;
        this.deck = deck;
        this.name = name;
        this.life = life;
        this.power = power;

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
            parseInt((cardText.trim().split('/')[2])) //Life
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
    time: 0
}

function cardSelectable(elmnt = document.getElementById('elmnt')) {
    elmnt.onmousedown = onMouseDown;

    function onMouseDown(e) {
        e == e || window.event;
        e.preventDefault();
        
        if (selected.id == null) {
            selected.id = parseInt(e.target.id.split('_')[0]);
            selected.time = new Date().getTime();
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.add('select');
        }

        if (selected.id != null && selected.id == parseInt(elmnt    .id.split('_')[0]) && (new Date().getTime()-selected.time)>180) {
            const cardSelected = cards[selected.id];
            cardSelected.div.classList.remove('select');
            selected.id = null;
            selected.time = 0;
        }

        elmnt.onmouseup = onMouseUp;
    };

    function onMouseUp(e) {
        elmnt.onmouseup = null;
    }
}