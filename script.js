"use strict";

// const tiles = [];
// const level1 = {
//   size: 10,
//   bombs: 15,
// };

// variable for the board
let BOARD_SIZE = 10;
let BOMBS = 10;
let isGameOver = false;
let gameWin = false;
let marked = 0;

/**
 *
 * text for bombs left
 *
 */
const text = document.querySelector("#text");
const h2 = document.createElement("h2");
h2.textContent = `Bombs Left: ${BOMBS}`;
text.append(h2);

/**
 *
 * button to reset
 *
 */
const settings = document.querySelector(".settings");
const resetBtn = document.createElement("button");
resetBtn.className = "button";
resetBtn.textContent = "Try Again?";
resetBtn.addEventListener("click", () => {
  location.reload();
});
settings.append(resetBtn);

/**
 *
 * function to create a board
 *
 * */

const createBoard = (size, bombs) => {
  const board = [];
  const bombPositions = getBombPositions(size, bombs);
  console.log(bombPositions);
  for (let x = 0; x < size; x++) {
    const row = [];
    for (let y = 0; y < size; y++) {
      const tileDiv = document.createElement("div");
      tileDiv.setAttribute("class", "HIDDEN");

      const tile = {
        tileDiv,
        x,
        y,
        bomb: bombPositions.some((p) => positionMatch(p, { x, y })),
        get status() {
          return this.tileDiv.className;
        },
        set status(value) {
          this.tileDiv.className = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }
  return board;
};

const boardDiv = document.querySelector(".board");
/**
 *
 * buttons for level
 *
 */
const levels = document.querySelector(".levels");
const level1Btn = document.createElement("button");
level1Btn.className = "button";
level1Btn.textContent = "Level 1";
level1Btn.addEventListener("click", () => {
  BOARD_SIZE = 10;
  BOMBS = 10;
  main();
});
levels.append(level1Btn);

const level2Btn = document.createElement("button");
level2Btn.className = "button";
level2Btn.textContent = "Level 2";
level2Btn.addEventListener("click", () => {
  BOARD_SIZE = 20;
  BOMBS = 20;
  main();
});
levels.append(level2Btn);

/**
 *
 * setting up the actual board
 *
 * */
const main = () => {
  const board = createBoard(BOARD_SIZE, BOMBS);
  // console.log(board);

  board.forEach((row) => {
    row.forEach((tile) => {
      boardDiv.append(tile.tileDiv);
      tile.tileDiv.addEventListener("click", () => {
        revealTile(board, tile);
        checkGameOver(board, tile);
      });
      tile.tileDiv.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        markTile(board, tile);
      });
    });
  });

  boardDiv.style.setProperty("--size", BOARD_SIZE);
};

/**
 *
 * Functions
 *
 */

function markTile(board, tile) {
  console.log(tile);
  if (isGameOver) {
    return;
  }
  if (tile.status !== "HIDDEN" && tile.status !== "MARKED") {
    return;
  }

  if (tile.status === "MARKED") {
    tile.status = "HIDDEN";
    marked--;
    h2.textContent = `Bombs Left: ${BOMBS - marked}`;
    return;
  }

  if (tile.status === "HIDDEN" && marked < BOMBS) {
    tile.status = "MARKED";
    marked++;
    h2.textContent = `Bombs Left: ${BOMBS - marked}`;
    checkWin(board);
    return;
  }
}

function revealTile(board, tile) {
  // console.log(tile);
  if (isGameOver) {
    return;
  }
  if (tile.status !== "HIDDEN") {
    return;
  }

  if (tile.bomb) {
    tile.status = "BOMB";
    return;
  }

  tile.status = "NUMBER";
  const adjTiles = nearbyTiles(board, tile);
  const bombs = adjTiles.filter((tile) => tile.bomb);
  if (bombs.length === 0) {
    adjTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.tileDiv.textContent = bombs.length;
  }
}

function nearbyTiles(board, { x, y }) {
  const tiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) {
        tiles.push(tile);
      }
    }
  }

  return tiles;
}

function getBombPositions(size, bombs) {
  const positions = [];

  while (positions.length < bombs) {
    const position = {
      x: randomNumber(size),
      y: randomNumber(size),
    };

    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position);
    }
  }

  return positions;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

const checkGameOver = (board, tile) => {
  if (tile.status === "BOMB") {
    // console.log(board);
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.bomb) {
          tile.status = "BOMB";
          console.log(tile);
        }
      });
    });
    isGameOver = true;
    alert("You triggered a bomb! game over! :(");
    return;
  } else {
    return;
  }
};

const checkWin = (board) => {
  console.log(board);
  let match = 0;

  board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.status === "MARKED" && tile.bomb == true) {
        match++;
      }
    });
  });
  if (match === BOMBS) {
    alert("you've won!");
  }
};
