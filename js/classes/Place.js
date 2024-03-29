class Place {
    constructor(id = '', size = 10, color = '', x, y) {
        this.id = id;
        this.size = size;
        this.color = color;

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

function cleanRangeList() {
    if (selected.editPlaces != null) {
        for(let edit of selected.editPlaces) {
            if (places[edit] != undefined) {
                document.getElementById(places[edit].id).className = 'place';
            }
        }
        selected.editPlaces = null;
    }
}

function placeSelectable(elmnt = document.getElementById('elmnt')) {
    elmnt.onmousedown = onMouseDown;
    
    function onMouseDown(e) {
        e == e || window.event;
        e.preventDefault();
        
        
        if (e.target.nodeName.toLowerCase() == 'div' && game.phase == 0) {
            const cardSelected = cards[selected.id];
            const placeId = e.target.id.split('_')[0];
            
            if (selected.id != null && ((new Date().getTime()-selected.time)>180)) {
                if ((!(selected.origin == 'cardBox')) && !(selected.editPlaces != null && selected.editPlaces.includes(parseInt(placeId)))) {
                    selected.id = null;
                }
                if (document.getElementById(placeId+'_place').childElementCount == 0 && selected.id != null) {
                    cardSelected.div.classList.add('mini');
                    cardSelected.img.classList.add('mini');

                    if (selected.origin != 'cardBox') {
                        const lastPlaceId = selected.origin.split('_')[0];
                        places[parseInt(lastPlaceId)].div.removeChild(cardSelected.div);
                        
                    }

                    if (selected.origin == 'cardBox') {
                        for (let pl of players) {
                            if (pl.deck == cards[selected.id].deck) {
                                players[players.indexOf(pl)].cardsInGame.push(selected.id);
                            }
                        }
                    }
                    
                    places[parseInt(placeId)].div.appendChild(cardSelected.div);
                    cards[selected.id].inGame = true;
                    game.turnActs++;
                }
                
                cardSelected.div.classList.remove('select');
                selected.id = null;
                selected.time = new Date().getTime();
                selected.origin = null;
                cleanRangeList();
            }
        }
    }
}