import './App.css';
import { sudokuPuzzles } from './sudokuPuzzles';

const selectedPuzzle = sudokuPuzzles.easy[0].puzzle;
const formatCellValue = (value) => (value === 0 ? null : value);

const Cell = ({
  id,
  row,
  column,
  initialValue,
}) => {
  const classList = [
    'cell',
    `row-${row}`,
    `col-${column}`,
  ]
  return (
    <div className={classList.join(' ').trim()}>
      <span>{initialValue}</span>
    </div>
  )
}

const getCellBlock = (row, col) => {
  return Math.ceil(col / 3) + (Math.ceil(row / 3) -1) * 3
}

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

const Sudoku = ({ puzzle }) => {
  const grid = createGrid(puzzle);
  return (
    <div className='sudoku'>
      {grid.map((cell) => (
        <Cell key={cell.id} {...cell} />
      ))}
    </div>
  )
}

function App() {
  return (
    <Sudoku puzzle={selectedPuzzle} />
  );
}

export default App;
