let places = [];

class Place {
    constructor(id = '', size = 10, color = '', x, y) {
        this.id = id;
        this.size = size;
        this.color = color;

        this.cardIn = null;

        let newPlace = document.createElement('div');
        newPlace.id=id;
        newPlace.classList.add('place');
        newPlace.style.backgroundColor = color;
        newPlace.style.width = newPlace.style.height = `${size}px`;

        board.appendChild(newPlace);

        this.div = newPlace;
        placeSelectable(this.div);
    }
}

function placeSelectable(elmnt = document.getElementById('elmnt')) {
    elmnt.onmousedown = onMouseDown;

    function onMouseDown(e) {
        e == e || window.event;
        e.preventDefault();
        const placeId = e.target.id.split('_')[0];

        
        if (selected.id != null && places[parseInt(placeId)].cardIn == null) {
            places[parseInt(placeId)].cardIn = selected.id;

            const cardSelected = cards[selected.id];
            cardSelected.div.classList.add('mini');
            cardSelected.img.classList.add('mini');

            const finalPos = {
                x: Math.round(elmnt.getBoundingClientRect().x),
                y: Math.round(elmnt.getBoundingClientRect().y),
                w: Math.round(elmnt.getBoundingClientRect().width),
                h: Math.round(elmnt.getBoundingClientRect().height)
            };

            console.log(finalPos);
            places[parseInt(placeId)].div.appendChild(cardSelected.div);
            cardSelected.div.classList.remove('select');
            
            selected.id = null;
            selected.time = new Date().getTime();
        }
    }
}