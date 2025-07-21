import './App.css';

const Cell = ({ id }) => {
  return (
    <div className='cell'>
      <span>{id}</span>
    </div>
  )
}

const getCellBlock = (row, col) => {
  return Math.ceil(col / 3) + (Math.ceil(row / 3) -1) * 3
}

const createGrid = () => {
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
          initialValue: 0,
        }))
    })
    .flat()
}

const Sudoku = () => {
  const grid = createGrid();
  return (
    <div className='sudoku'>
      {Object.keys(grid).map((cell) => (
        <Cell key={grid[cell].id} {...grid[cell]} />
      ))}
    </div>
  )
}

function App() {
  return (
    <Sudoku />
  );
}

export default App;
