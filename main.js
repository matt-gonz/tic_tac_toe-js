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
            DisplayController.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9){
            DisplayController.setResultMessage("Draw");
            isOver = true;
            return;
        }
        round++;
        DisplayController.setMessageElem(
            `Player ${getCurrentPlayerSign()}'s turn`
        );
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSymbol() : playerO.getSymbol();
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

const DisplayController = (() => {
    const fieldElems = document.querySelectorAll(".field");
    const messageElem = document.getElementById("message");
    const restartButton = document.getElementById("restartButton");

    fieldElems.forEach((field) => 
        field.addEventListener("click", (e) => {
            if (GameController.getIsOver() || e.target.textContent !== "") return;
            GameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    );

    restartButton.addEventListener("click", (e) => {
        Gameboard.reset();
        GameController.reset();
        updateGameboard();
        setMessageElem("Player X's turn");
    });

    const updateGameboard = () => {
        for (let i = 0; i < fieldElems.length; i++){
            fieldElems[i].textContent = Gameboard.getField(i);
        }
    };

    const setResultMessage = (winner) => {
        if (winner === "Draw"){
            setMessageElem("It's a draw!");
        }
        else{
            setMessageElem(`Player ${winner} has won!`);
        }
    };

    const setMessageElem = (message) => {
        messageElem.textContent = message;
    };

    return{
        setResultMessage,
        setMessageElem
    };
})();
