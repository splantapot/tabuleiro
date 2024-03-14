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



        return newPlace;
    }
}

function placeSelectable(elmnt = document.getElementById('elmnt')) {
    elmnt = document.getElementById('elmnt');

    
}