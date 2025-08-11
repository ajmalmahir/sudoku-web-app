import './App.css';
import Sudoku from './Sudoku';
import { sudokuPuzzles } from './sudokuPuzzles';
import { createGrid } from './utils';

const selectedPuzzle = sudokuPuzzles.easy[0].puzzle;
const grid = createGrid(selectedPuzzle)

function App() {
  return (
    <Sudoku grid={grid} />
  );
}

export default App;
