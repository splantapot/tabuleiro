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

        newPlace.appendChild(imagemCarta);
        cardBox.appendChild(newPlace);
        
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
        
        //console.log(e.srcElement.id.trim().split('_')[0]);
        console.log(e.srcElement)
        cardView.style.display = 'block'
        
        elmnt.onmouseleave = onMouseLeave;
    }

    function onMouseLeave(e) {
        
        console.log(e.srcElement.id.trim().split('_')[0]);
        cardView.style.display = 'none';

        elmnt.onmousemove = null; 
    }
}