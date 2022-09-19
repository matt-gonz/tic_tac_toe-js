const Gameboard = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, symbol) => {
        if (index > boardArray.length) return;
        boardArray[index] = symbol;
    };

    const getField = (index) => {
        if (index > boardArray.length) return;
        return boardArray[index];
    };

    const reset = () => {
        for (let i = 0; i < boardArray.length; i++){
            boardArray[i] = "";
        }
    };

    return {
        setField,
        getField,
        reset
    };

})();

const Player = (symbol) => {
    this.symbol = symbol;

    const getSymbol = () => {
        return symbol;
    };

    return { 
        getSymbol 
    };
};

const GameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        Gameboard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)){
            isOver = true;
            return;
        }
        if (round === 9){
            isOver = true;
            return;
        }
        round++;
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
             possibleCombination.every(
                (index) => Gameboard.getField(index) === getCurrentPlayerSign()
             )
            );
    };

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    return {
        playRound,
        getIsOver,
        reset
    };
})();


