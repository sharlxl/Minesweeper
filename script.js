"use strict";

const board = document.querySelector(".board");
const width = 10;
const tiles = [];

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const tile = document.createElement("div");
    tile.setAttribute("id", i);
    board.appendChild(tile);
    tiles.push(tile);
  }
}

createBoard();
