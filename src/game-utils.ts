// private functions

function countNeighbors(grid: boolean[][], x: number, y: number) {
  let neighbors = 0;
  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      if (yOffset === 0 && xOffset === 0) {
        continue;
      }
      const neighborX = x + xOffset;
      const neighborY = y + yOffset;
      if (
        neighborX >= 0 &&
        neighborX < grid[0].length &&
        neighborY >= 0 &&
        neighborY < grid.length &&
        grid[neighborY][neighborX]
      ) {
        neighbors++;
      }
    }
  }
  return neighbors;
}

// public functions

export function initializeGrid(width: number, height: number) {
  const grid: boolean[][] = [];
  for (let y = 0; y < height; y++) {
    grid.push([]);
    for (let x = 0; x < width; x++) {
      grid[y].push(false);
    }
  }
  return grid;
}

export function getNextGridState(grid: boolean[][]) {
  const nextGrid: boolean[][] = [];
  for (let y = 0; y < grid.length; y++) {
    nextGrid.push([]);
    for (let x = 0; x < grid[y].length; x++) {
      const neighbors = countNeighbors(grid, x, y);
      if (grid[y][x]) {
        nextGrid[y].push(neighbors === 2 || neighbors === 3);
      } else {
        nextGrid[y].push(neighbors === 3);
      }
    }
  }
  return nextGrid;
}
