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
        newPlace.style.width = `${60}px`
        newPlace.style.height = `${60/this.cardScale}px`;

        /*let imagemCarta = document.createElement('img');
        imagemCarta.src = `./cartas/${id}.jpg`
        newPlace.appendChild(imagemCarta);*/


        cardBox.appendChild(newPlace);
    }
}

function makeCards(str = '', deck = '') {
    let cartText = str.trim().split(';');
    cartText.forEach((cardText) => {
        cards.push(new Cards(
            `${cards.length}_card`, //id
            deck, //Deck
            cardText.trim().split('/')[0], //Name
            parseInt((cardText.trim().split('/')[1])), //Power
            parseInt((cardText.trim().split('/')[2])) //Life
        ))
    });
    console.log(cards);
}