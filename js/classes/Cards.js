class Cards {
    constructor(id, deck, life, attack, range, dominio) {
        this.id = id;
        this.deck = deck;
        this.life = life;
        this.attack = attack;
        this.range = range;
        this.dominio = dominio;

        this.cardScale = (1080/1650); // =~ 0.6545

        let newPlace = document.createElement('div');
        newPlace.id = id;
        newPlace.classList.add('card');
    }
}