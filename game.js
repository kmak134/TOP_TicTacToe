const cell0 = document.querySelector('#cell-0');
const cell1 = document.querySelector('#cell-1');
const cell2 = document.querySelector('#cell-2');
const cell3 = document.querySelector('#cell-3');
const cell4 = document.querySelector('#cell-4');
const cell5 = document.querySelector('#cell-5');
const cell6 = document.querySelector('#cell-6');
const cell7 = document.querySelector('#cell-7');
const cell8 = document.querySelector('#cell-8');

const X_Picture = "url(media/cross.svg)";
const O_Picture = "url(media/circle.svg)";
const gameText = document.querySelector('.game-text');

const GameBoard = class {
    /* 
        [0 1 2]
        [3 4 5]
        [6 7 8]
    */
    constructor() {
        this.board = ['.', '.', '.', '.', '.', '.', '.', '.', '.'];
    }

    setCell(position, symbol) {
        if (symbol === 'X' || symbol === 'O') {
            if (this.board[position] === '.') {
                this.board[position] = symbol;

                return true;
            } else {
                console.log('that space has already been filled. choose another');
                return false;
            }
        } else {
            console.log('error, wrong symbol: ' + symbol);
            return false;
        }
    }

    checkIfThreeSymbolsInARowFound() {
        if ((this.board[0] === this.board[3] && this.board[3] === this.board[6] && this.board[0] !== '.') || // first column
            (this.board[1] === this.board[4] && this.board[4] === this.board[7] && this.board[1] !== '.') || // second column
            (this.board[2] === this.board[5] && this.board[5] === this.board[8] && this.board[2] !== '.') || // third column
            (this.board[0] === this.board[1] && this.board[1] === this.board[2] && this.board[0] !== '.') || // first row
            (this.board[3] === this.board[4] && this.board[4] === this.board[5] && this.board[3] !== '.') || // second row
            (this.board[6] === this.board[7] && this.board[7] === this.board[8] && this.board[6] !== '.') || // third row
            (this.board[0] === this.board[4] && this.board[4] === this.board[8] && this.board[0] !== '.') || // top left to bottom right diagonal
            (this.board[2] === this.board[4] && this.board[4] === this.board[6] && this.board[2] !== '.')    // top right to bottom left diagonal
        ) {
            return true;
        } else {
            return false;
        }
    }

    checkForTie() {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === '.') return false;
        }
        return true;
    }

    checkIfGameWon() {
        if (this.checkIfThreeSymbolsInARowFound()) {
            return true;
        } else {
            return false;
        }
    }
}

class Player {
    constructor(name, symbol, isCurrentTurn, symbolPic) {
        this.name = name;
        this.symbol = symbol;
        this.isCurrentTurn = isCurrentTurn;
        this.symbolPic = symbolPic;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get symbol() {
        return this._symbol;
    }

    set symbol(symbol) {
        this._symbol = symbol;
    }

    get isCurrentTurn() {
        return this._isCurrentTurn;
    }

    set isCurrentTurn(isCurrentTurn) {
        this._isCurrentTurn = isCurrentTurn;
    }

    get symbolPic() {
        return this._symbolPic;
    }

    set symbolPic(symbolPic) {
        this._symbolPic = symbolPic;
    }
}

const Game = class {
    TicTacToe = new GameBoard();
    player1 = new Player('Player 1', 'X', false, X_Picture);
    player2 = new Player('Player 2','O', false, O_Picture);
    gameOver = false;

    checkIfGameOver() {
        if (this.gameOver) return true;
        return false;
    }

    getCurrentPlayer() {
        if (this.player1.isCurrentTurn) {
            return this.player1;
        } else {
            return this.player2;
        }
    }

    setGameText(text) {
        gameText.textContent = text;
    }

    switchPlayerTurns() {
        if (this.player1.isCurrentTurn) {
            this.setGameText(`${this.player2.name} Turn`);
        } else {
            this.setGameText(`${this.player1.name} Turn`);
        }
        this.player1.isCurrentTurn = !(this.player1.isCurrentTurn);
        this.player2.isCurrentTurn = !(this.player2.isCurrentTurn);
    }
    
    startTurnForPlayer(player, cell_num) {
        let res = this.TicTacToe.setCell(cell_num, player.symbol);
        console.log(this.TicTacToe.board);
        if (!res) {
            this.setGameText('This cell has already been filled, please select another!');
            return false;
        } 

        if (this.TicTacToe.checkIfGameWon()) {
            console.log("game won");
            this.gameOver = true;
            this.setGameText(`Game Finished. ${player.name} Won!`);
        } else if (this.TicTacToe.checkForTie()) {
            console.log('game tie');
            this.gameOver = true;
            this.setGameText(`Game Finished. Tie!`);
        } else {
            this.switchPlayerTurns();
        }
        return true;
    }

    startGame() {
        this.player1.isCurrentTurn = !(this.player1.isCurrentTurn);
        this.setGameText(`${this.player1.name} Turn`);
        console.log(this.TicTacToe.board);
    }
}


const newGame = new Game();
newGame.startGame();

cell0.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 0);
        if (res) cell0.style.backgroundImage = currPlayer.symbolPic;
    }
});

cell1.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 1);
        if (res) cell1.style.backgroundImage = currPlayer.symbolPic;
    }
});

cell2.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 2);
        if (res) cell2.style.backgroundImage = currPlayer.symbolPic;
    }
});

cell3.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 3);
        if (res) cell3.style.backgroundImage = currPlayer.symbolPic;
    }
});

cell4.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 4);
        if (res) cell4.style.backgroundImage = currPlayer.symbolPic;
    }
});

cell5.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 5);
        if (res) cell5.style.backgroundImage = currPlayer.symbolPic;
    }
});

cell6.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 6);
        if (res) cell6.style.backgroundImage = currPlayer.symbolPic;
    }
});

cell7.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 7);
        if (res) cell7.style.backgroundImage = currPlayer.symbolPic;
    }
});

cell8.addEventListener('click', () => {
    if (!newGame.gameOver) {
        let currPlayer = newGame.getCurrentPlayer();
        let res = newGame.startTurnForPlayer(currPlayer, 8);
        if (res) cell8.style.backgroundImage = currPlayer.symbolPic;
    }
});



