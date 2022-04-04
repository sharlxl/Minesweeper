"use strict";

const board = document.querySelector(".board");
const width = 10;
const bombs = 20;
const tiles = [];

function createBoard() {
  //create bombs and safe tiles
  const bombsArray = Array(bombs).fill("bomb");
  const safeArray = Array(width * width - bombs).fill("safe");
  const combinedArray = safeArray.concat(bombsArray);
  const shuffledArray = combinedArray.sort(() => Math.random() - 0.5);

  //create tiles inside the board
  for (let i = 0; i < width * width; i++) {
    const tile = document.createElement("div");
    tile.setAttribute("id", i);
    tile.classList = shuffledArray[i];
    board.appendChild(tile);
    tiles.push(tile);
  }

  //add adj numbers
  for (let i = 0; i < tiles.length; i++) {
    //variable to identify the left and right edge in a 10x10 grid
    const leftEdge = i % width === 0;
    const rightEdge = i === width - 1;
    let bombNearby = 0;

    if (tiles[i].classList.contains("safe")) {
      //checking if west tile contains bomb, if true number to appear on selected tile ++.
      if (i > 0 && !leftEdge && tiles[i - 1].classList.contains("bomb")) {
        bombNearby++;
      }

      //check north-east tile
      if (
        i > 9 &&
        !rightEdge &&
        tiles[i + 1 - width].classList.contains("bomb")
      ) {
        bombNearby++;
      }

      // check north tile
      if (i > 10 && tiles[i - width].classList.contains("bomb")) {
        bombNearby++;
      }

      // check northwest tile
      if (
        i > 11 &&
        !leftEdge &&
        tiles[i - 1 - width].classList.contains("bomb")
      ) {
        bombNearby++;
      }

      //check east tile
      if (i < 98 && !rightEdge && tiles[i + 1].classList.contains("bomb")) {
        bombNearby++;
      }

      //check southwest tile
      if (
        i < 90 &&
        !leftEdge &&
        tiles[i - 1 + width].classList.contains("bomb")
      ) {
        bombNearby++;
      }

      //check southeast tile
      if (
        i < 88 &&
        !rightEdge &&
        tiles[i + 1 + width].classList.contains("bomb")
      ) {
        bombNearby++;
      }

      //check south tile
      if (i < 89 && tiles[i + width].classList.contains("bomb")) {
        bombNearby++;
      }
      //
      tiles[i].setAttribute("data", bombNearby);
      console.log(tiles[i]);
    }
  }
}

createBoard();
testing: D;
