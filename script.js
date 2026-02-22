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

function Player(name,marker){

    this.name = name;
    this.marker = marker;
    this.active = false;
    this.win = false;

};


const GameController = function (name1,marker1,name2,marker2) 
{
    
    const player1 = new Player(name1,marker1);
    const player2 = new Player(name2,marker2);

    player1.active = true;

    function switchPlayerTurn(index)
    {
        if(player1.active && gameboard.placeMarker(index,player1.marker))
        {
            player1.active = false;
            player2.active = true;
        }
        else if(player2.active && gameboard.placeMarker(index,player2.marker))
        {
            player2.active = false;
            player1.active = true;
        }
            
    }
    function playerWinCondition(marker)
    {
        const winBoard = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        const currentBoard = gameboard.getBoard();

        if(winBoard.some(cell => cell.every(index => currentBoard[index] === marker))  )
        {
            if(player1.marker === marker)
            {
                player1.win = true;
            }
            else if(player2.marker === marker)
            {
                player2.win = true;
            }
        }
    }
    function playerTurn(index)
    {

        if(!(player1.win || player2.win || gameboard.getBoard().every(cell => cell !== "")))
        {
            switchPlayerTurn(index); 
            if(!player1.active)
            {
                playerWinCondition(player1.marker);
            }
            else
            {
                playerWinCondition(player2.marker);
            }
        }
    }
    function getCurrentPlayer()
    {
        let currentPlayer = "";
        if(player1.active)
            currentPlayer = player1.name;
        else
            currentPlayer = player2.name;
        return currentPlayer;
    }
    function getWinner()
    {
        let wonPlayer = "";
        if(player1.win)
            wonPlayer = player1.name;
        else if(player2.win)
            wonPlayer = player2.name;
        else
            wonPlayer = "draw";
        return wonPlayer;
    }
    function resetGame()
    {
        let drawCase = Math.random()
        if(player1.win)
        {
            player2.active = true;
            player1.active = false
        }
        else if(player2.win)
        {
            player2.active = false;
            player1.active = true;
        }
        else if( drawCase >= 0.5)
        {
            player2.active = true;
            player1.active = false
        }
        else
        {
            player1.active = true;
            player2.active = false;
        }
        player1.win = false;
        player2.win = false;
        gameboard.resetBoard();
    }

    return { playerTurn,getCurrentPlayer,getWinner,resetGame };
};

const turn = document.querySelector(".turn");
const reset = document.querySelector(".reset");
const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
    const index = Number(cell.dataset.index);
    cell.addEventListener('click',() => {
        game.playerTurn(index);
        display();
    })
});

function display()
{
    let board = gameboard.getBoard();
    cells.forEach((cell) => {
        const index = Number(cell.dataset.index);
        cell.textContent = board[index];
    })
    if(game.getWinner())
    {
        if(game.getWinner() === "draw" )
        {
            turn.textContent = "The game is a draw!";
        }
        else
        {
            turn.textContent = "The winner is " + game.getWinner() + "!"; 
        }
    }
    else
    {
        turn.textContent = "Player " + game.getCurrentPlayer() + "'s turn."
    }
}

reset.addEventListener('click',() =>{
    game.resetGame();
    cells.forEach((cell) => {
        cell.textContent = "";
    })
    display();
})

const game = GameController("Player 1", "x", "Player 2", "o");

display();

