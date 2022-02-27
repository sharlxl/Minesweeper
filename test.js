"use strict";

//logic for minesweeper

//tile status for the
const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

//create a board
export function createBoard(boardSize, numberOfMines) {
  //to display the board in an array, easier to visualise
  const board = [];
  //create rows
  for (let x = 0; x < boardSize; x++) {
    const row = [];

    for (let y = 0; y < boardSize; y++) {
      //to display an actual element with a default status
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUSES.HIDDEN;

      const tile = {
        element,
        x,
        y,
      };
      //pushes the tile into the row.
      row.push(tile);
    }
    //pushes the row into the board.
    board.push(row);
  }
  return board;
}
