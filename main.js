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


