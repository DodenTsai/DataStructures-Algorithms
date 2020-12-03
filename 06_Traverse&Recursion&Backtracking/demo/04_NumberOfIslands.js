/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  var moveX = [0, 1, 0, -1];
  var moveY = [1, 0, -1, 0];

  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  var count = 0;
  var row = grid.length, column = grid[0].length;

  for (var i =0; i < row; i++) {
    for (var j = 0; j < column; j++) {
      if (grid[i][j] === '1') {
        dfs(grid, i, j);
        count++;
      }
    }
  }

  return count;

  function dfs(grid, i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
      return;
    }

    grid[i][j] = '0';
    for (var k = 0; k < 4; k++) {
      dfs(grid, i + moveX[k], j + moveY[k]);
    }
  }
};