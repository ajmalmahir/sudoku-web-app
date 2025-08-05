import './App.css';

import Cell from './Cell'
import createGrid from './utils';
import { sudokuPuzzles } from './sudokuPuzzles';

const selectedPuzzle = sudokuPuzzles.easy[0].puzzle;
const grid = createGrid(selectedPuzzle)

const Sudoku = (props) => {
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
    <Sudoku grid={grid} />
  );
}

export default App;
