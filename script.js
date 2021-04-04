
let playerOne = 'X';
let playerTwo = 'O';
let currentTurn = 1;
let spaceElems = [];
let won = false;

function join_(ittr, ch) {
    let s = '';
    for(let e in ittr) {
        s += ittr[e] + ((e == ittr.length - 1) ? '' : ch);
    }
    return s;
}

function swapPlayerSymbols() {
    let temp = playerOne;
    playerOne = playerTwo;
    playerTwo = temp;
}

function createBoard() {
    spaceElems = [];
    won = false;
    let cont = document.getElementById('boardContainer');
    function clickSpace(index, val) {
        board.setSpace(index, val);
        checkWinner();
        if(!won) {
            if(currentTurn == 1) currentTurn = 2;
            else currentTurn = 1;
            if(board.getSpaces(0).length > 0) doAIMove();
        }
        updateBoardDisplay();
    }
    for(let i = 0; i < 9; i++) {
        let elem = document.createElement('div');
        elem.className = 'space';
        elem.id = 'space_chnl' + i;
        elem.onclick = () => clickSpace(i, 1);
        cont.appendChild(elem);
        spaceElems[spaceElems.length] = elem;
    }
}

function resetSymbols() {
    for(let i = 0; i < 9; i++) {
        let element = document.getElementById('space_chnl' + i);
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

function disableClicks() {
    for(let i in spaceElems) {
        spaceElems[i].onclick = '';
    }
}



class Board {
    constructor() {
        this.board = new Array(9);
        for(let i = 0; i < 9; i++) this.board[i] = 0;
    }
}

Board.prototype.setSpace = function(index, val) {
    this.board[index] = val;
    console.log('set value of space ' + index + ' to ' + val);
}

Board.prototype.getSpaces = function(sym) {
    let spaces = []
    for(let y = 0; y < 3; y++) {
        for(let x = 0; x < 3; x++) {
            if(this.board[x + y * 3] == sym)
                spaces[spaces.length] = [x, y];
        }
    }
    return spaces
}

Board.prototype.checkWinner = function() {
    for(let i = 0; i < 3; i++) {
        let player = this.board[i * 3];
        if(player != 0 && (player == this.board[i * 3 + 1] && player == this.board[i * 3 + 2])) {
            console.log('won horizontally. (' + join_([i*3, i*3+1, i*3+2], ', ') + ')');
            console.log(this.board);
            return player;
        }
        player = this.board[i];
        if(player != 0 && (player == this.board[i + 3] && player == this.board[i + 6])) {
            console.log('won vertically. (' + join_([i, i+3, i+6], ', ') + ')');
            console.log(this.board);
            return player;
        }
    }
    let player = this.board[0];
    if(player != 0 && (player == this.board[4] && player == this.board[8])) return player;
    player = this.board[2];
    if(player != 0 && (player == this.board[4] && player == this.board[6])) return player;
    return 0;
}

let board;



function checkWinner() {
    let winner = board.checkWinner();
    if(winner == 0) return;
    let player = (winner == 1) ? playerOne : playerTwo;
    if(winner == 1) {
        won = true;
        document.getElementById('winner').innerText = "Congraturations! A winner is you!";
        document.getElementById('winner').className = player;
        disableClicks();
    }
    if(winner == 2) {
        won = true;
        document.getElementById('winner').innerText = "You fucking lost!!";
        document.getElementById('winner').className = player;
        disableClicks();
    }
}

function updateBoardDisplay() {
    resetSymbols();
    for(let i = 0; i < 9; i++) {
        let element = document.getElementById('space_chnl' + i);
        if(board.board[i] == 0) continue;
        let symb = document.createElement('span');
        symb.className = (board.board[i] == 1) ? playerOne : playerTwo;
        symb.innerText = (board.board[i] == 1) ? playerOne : playerTwo;
        element.appendChild(symb);
    }
}


function doAIMove() {
    let spaces = board.getSpaces(0);
    if(spaces.length < 1) throw 'no spaces left';
    let space = spaces[Math.floor(Math.random() * spaces.length)];
    board.setSpace(space[0] + space[1] * 3, 2);
    checkWinner();
    updateBoardDisplay();
}



window.onload = function() {
    createBoard();
    board = new Board();
    let b = document.getElementById('boardContainer');
    b.style.marginTop = ((window.innerHeight - b.clientHeight) / 2.5) + 'px';
}

window.onresize = function() {
    let b = document.getElementById('boardContainer');
    b.style.marginTop = ((window.innerHeight - b.clientHeight) / 2.5) + 'px';
}

