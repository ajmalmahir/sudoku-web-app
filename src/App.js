import './App.css';
import Sudoku from './Sudoku';
import { sudokuPuzzles } from './sudokuPuzzles';
import { createGrid } from './utils';

const puzzle = sudokuPuzzles.easy[0].puzzle;
const solution = sudokuPuzzles.easy[0].solution

function App() {
  return (
    <Sudoku puzzle={createGrid(puzzle)} solution={createGrid(solution)} />
  );
}

export default App;
