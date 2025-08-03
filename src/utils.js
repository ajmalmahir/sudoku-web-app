const getCellBlock = (row, col) => {
  return Math.ceil(col / 3) + (Math.ceil(row / 3) -1) * 3
}

const formatCellValue = (value) => (value === 0 ? null : value);

const createGrid = (puzzle) => {
  const rowNames = 'abcdefghi'
  return [...rowNames]
    .map((row, rowIndex) => {
      return Array(9)
        .fill('')
        .map((item, index) => ({
          id: row + (index + 1),
          column: index + 1,
          row: rowIndex + 1,
          block: getCellBlock(rowIndex + 1, index + 1),
          initialValue: puzzle ? formatCellValue(puzzle[rowIndex][index]) : null,
        }))
    })
    .flat()
}

export default createGrid;