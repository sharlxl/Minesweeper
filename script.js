"use strict";

const board = document.querySelector(".board");
const width = 10;
const bombs = 20;
const tiles = [];

function createBoard() {
  const bombsArray = Array(bombs).fill("bomb");
  const safeArray = Array(width * width - bombs).fill("safe");
  const combinedArray = safeArray.concat(bombsArray);
  const shuffledArray = combinedArray.sort(() => Math.random() - 0.5);
  console.log(shuffledArray);

  for (let i = 0; i < width * width; i++) {
    const tile = document.createElement("div");
    tile.setAttribute("id", i);
    tile.classList = shuffledArray[i];
    board.appendChild(tile);
    tiles.push(tile);
  }
}

createBoard();
