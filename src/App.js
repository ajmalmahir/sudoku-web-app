import './App.css';
import { useState } from 'react';

import Cell from './Cell'
import createGrid from './utils';
import { sudokuPuzzles } from './sudokuPuzzles';

const selectedPuzzle = sudokuPuzzles.easy[0].puzzle;
const grid = createGrid(selectedPuzzle)

const Sudoku = (props) => {
  const [grid, setGrid] = useState(props.grid)
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
