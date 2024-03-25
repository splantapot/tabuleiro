let playersPaises = [-1, -1];
function ctrSelector(id) {

    playersPaises[id] = next(playersPaises[id]);
    if (playersPaises[id] == paises.length) {
        if (playersPaises.includes(0)) {
            // console.log('já existe esse pais');
            playersPaises[id] = alreadyHas(playersPaises[id]);
        } else {
            playersPaises[id] = 0;
        }
    }
    document.getElementById(`${id}_slImg`).src = `../imgs/bands/${paises[playersPaises[id]]}.png`;

}

function next(nowCountry) {
    let paisesLivres = []
    for (let i = 0; i < 8; i++) {
        if (!playersPaises.includes(i)) {
            paisesLivres.push(i);
        }
    }
    if (paisesLivres.length>=1) {
        // console.log(paisesLivres + " | "+nowCountry)
        let nextCountry, can = false;
        for (const ctr of paisesLivres) {
            if (nowCountry < ctr) {
                can = true;
                break;
            }
        }
        if (!can) {
            nowCountry = -1;
        }
        for (const ctr of paisesLivres) {
            if (ctr > nowCountry) {
                nextCountry = ctr;
                break;
            }
        }
        return nextCountry;
    } else {
        // console.log('limite de players e países')
        return nowCountry;
    }
}

function rmvPlayer() {
    if (playersPaises.length < 3) {
        alert('O mínimo de jogadores é 2');
    } else {
        let id = playersPaises.length;
        document.getElementById(`${id}_sl`).style.display = 'none';
        playersPaises.splice(playersPaises.length-1, 1);
    }
    // console.log("NumPlayers = "+playersPaises.length)
    // console.log(playersPaises)
}

function addPlayer() {
    if (playersPaises.length > 7) {
        alert('O máximo de jogadores é 8');
    } else {
        let id = playersPaises.length;
        document.getElementById(`${id}_sl`).style.display = 'initial';
        playersPaises.push(-1);
    }
    // console.log("NumPlayers = "+playersPaises.length)
    // console.log(playersPaises)
}

function startGame() {
    if (playersPaises.includes(-1)) {
        alert('Selecione pelo menos 2 países');
    } else {
        console.log(playersPaises)
        for (const option of playersPaises) {
            players.push(new Player(paises[option]));
        }
        setTimeout(() => {
            game.turnPlayerMax = players.length;
            game.turnMax = document.getElementById("turnCoder").value;
            setTimeout(() => {
                endGame.style.width = '0';
                endGame.style.left = '-50%'
            }, 100);
            fps();
        },200);
    }
}
