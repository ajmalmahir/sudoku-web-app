import './App.css';

import Cell from './Cell'
import createGrid from './utils';
import { sudokuPuzzles } from './sudokuPuzzles';

const selectedPuzzle = sudokuPuzzles.easy[0].puzzle;

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
