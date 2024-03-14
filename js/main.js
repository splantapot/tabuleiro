const back = document.getElementById('back');
const board = document.getElementById('board');
const cardBox = document.getElementById("cardBox");

const placeNumbers = 15;
const placeSize = back.clientHeight<back.clientWidth? 
    back.clientHeight-(back.clientHeight%placeNumbers): 
    back.clientHeight-(back.clientWidth%placeNumbers)
;
board.style.width = board.style.height = `${placeSize}px`;

let places = [];

for (let y = 0; y < placeNumbers; y++) {
    for (let x = 0; x < placeNumbers; x++) {
        let cor = (x+y)%2==0? 'rgb(190,190,190)':'rgb(100,100,100)';
        places.push(new Place(`${(y*10)+x}_place`, placeSize/placeNumbers, cor, x, y));
    }
}

let cards = [];

makeCards(`
    Zumbí dos Palmares/80/150;
    Esperança Garcia/60/200;
    Edson Arantes (Pelé)/90/150;
    Dom Pedro II/50/130;
    Machado de Assis/70/100;
    Tarsila do Amaral/80/130;
    Getúlio Vargas/80/100;
    Carmem Miranda/80/160  
`, 'Brasil');