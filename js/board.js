const back = document.getElementById('back');
const board = document.getElementById('board');
const cardBox = document.getElementById("cardBox");

const placeNumbers = 15;

const placeSize = back.clientHeight<back.clientWidth? 
    back.clientHeight-(back.clientHeight%placeNumbers): 
    back.clientHeight-(back.clientWidth%placeNumbers)
;

board.style.width = board.style.height = `${placeSize}px`;
const placePixel = placeSize/placeNumbers;

document.getElementById('boardImg').style.width = board.style.width;
document.getElementById('boardImg').style.height = board.style.height;

const stylesSheets = document.styleSheets[1];
const classMini = stylesSheets.cssRules[6];

classMini.style.setProperty('height', `${placePixel*0.8}px`);
classMini.style.setProperty('width', `${placePixel*0.8*0.65}px`);

let places = [];
let cards = [];