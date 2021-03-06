"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard(width = WIDTH, height = HEIGHT) {
  for (let y = 0; y < height; y++){
    board.push([]);
    for (let x = 0; x < width; x++){
      board[y].push(null);
    }
  }
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {

  //get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  //create top row of gameboard, add id, add event listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //add a cell in the header for each column to the dom, add id's
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    //Create a table row element and assign to a "row" variable
    const tableRow = document.createElement("tr");


    for (let x = 0; x < WIDTH; x++) {
      // Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");

      // add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      cell.setAttribute("id", `${y}-${x}`);

      //append the table cell to the table row
      tableRow.append(cell);
    }
    //append the row to the html board
      htmlBoard.append(tableRow);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // write the real version of this, rather than always returning 5
  for (let y = HEIGHT - 1; y >=0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //make a div and insert into correct table cell
  const gamePiece = document.createElement("div");
  gamePiece.classList.add("piece", `p${currPlayer}`);
  document.getElementById(`${y}-${x}`).append(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) {
  //pop up alert message
  alert(`Player ${currPlayer} WINS!!`)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  //add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame

  //FIXME:
  //The tie doesn't work, it returns that player 2 wins, but
  //the problem isn't likely to be in this if block.
  if (board[0].every(cell => cell)) {
    return endGame("It's a Tie!");
  }



  // switch players
  // switch currPlayer 1 <-> 2
    currPlayer === 1? currPlayer = 2 : currPlayer = 1;
    document.getElementById("playerTurn").innerText = `Player ${currPlayer}'s Turn`;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */

  function _win(cells) {

  // TODO: Check four cells to see if they're all legal & all color of current
  // player
   return cells.every (
      ([y, x]) => 
      y >= 0 &&
      y < HEIGHT &&
      x >= 0 &&
      x < WIDTH &&
      board[y][x] === currPlayer
      );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y,x],[y+1,x],[y+2,x],[y+3,x]];
      let diagDL = [[y,x],[y+1,x-1],[y+2,x-2],[y+3,x-3]];
      let diagDR = [[y,x],[y+1,x+1],[y+2,x+2],[y+3,x+3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }


      }
    }
        // find winner (only checking each win-possibility as needed)


  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL

}

makeBoard();
makeHtmlBoard();

