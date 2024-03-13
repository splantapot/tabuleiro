const back = document.getElementById('back');
const board = document.getElementById('board');
const cardViewer = document.getElementById("cardViewer");
const cardBox = document.getElementById("cardBox");

const placeNumbers = 25;
const placeSize = back.clientHeight<back.clientWidth? 
    back.clientHeight-(back.clientHeight%placeNumbers): 
    back.clientHeight-(back.clientWidth%placeNumbers)
;
board.style.width = board.style.height = `${placeSize}px`;
cardViewer.style.margin = `${(back.clientHeight%placeNumbers)/2}px` 

let places = [];

for (let y = 0; y < placeNumbers; y++) {
    for (let x = 0; x < placeNumbers; x++) {
        let cor = (x+y)%2==0? 'rgb(190,190,190)':'rgb(100,100,100)';
        places.push(new Place(`${(y*10)+x}_place`, placeSize/placeNumbers, cor, x, y));
    }
}