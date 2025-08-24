const formatCellValue = (value) => (value === 0 ? null : value);

const getCellBlock = (row, col) => {
  return Math.ceil(col / 3) + (Math.ceil(row / 3) -1) * 3;
}

const findCellMates = (grid, cellId) => {
  const selected = grid.find(cell => cell.id === cellId);
  if (!selected) return new Set();
  return new Set(
    grid.filter(
      cell => cell.id !== selected.id &&
      (
        cell.row === selected.row || 
        cell.column === selected.column || 
        cell.block === selected.block ||
        (cell.currentValue && cell.currentValue === selected.currentValue)
      )
    )
    .map(cell => cell.id)
  );
};

const createGrid = (puzzle) => {
  const grid = Array.from({ length: 81 }, (_, i) => {
    const row = Math.floor(i / 9);
    const col = i % 9;
    return {
      id: String.fromCharCode(97 + row) + (col + 1),
      row: row + 1,
      column: col + 1,
      block: getCellBlock(row + 1, col + 1),
      initialValue: puzzle ? formatCellValue(puzzle[row][col]) : null,
      currentValue: puzzle ? formatCellValue(puzzle[row][col]) : null,
    };
  });

  // grid.forEach(cell => {
  //   cell.cellMates = grid
  //     .filter(c => c.id !== cell.id && (c.row === cell.row || c.column === cell.column || c.block === cell.block))
  //     .map(c => c.id);
  // });

  return grid;
}

export {findCellMates, createGrid};