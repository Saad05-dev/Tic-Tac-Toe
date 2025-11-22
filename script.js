const gameboard = (function () {
    
    const board =["","","","","","","","",""];

    const getBoard = () => board.slice();
    const placeMarker = (index,marker) =>{
        if(index >= 0 && index < 9 && board[index] === "" && (marker === "x" || marker === "o"))
            {board[index] = marker;
            return true;}
        else
            return false;
    }
    const resetBoard = () => board.fill("");

    return { getBoard, placeMarker, resetBoard};
})();