import './App.css';
import { useState } from 'react';

import Cell from './Cell'
import { getCellMates, createGrid } from './utils';
import { sudokuPuzzles } from './sudokuPuzzles';

const selectedPuzzle = sudokuPuzzles.easy[0].puzzle;
const grid = createGrid(selectedPuzzle)

const Sudoku = (props) => {
  const [grid, setGrid] = useState(props.grid)

  const highlightMates = (cellMates) => {
    setGrid(
      grid.map((cell) => {
        if (cellMates.includes(cell.id)) {
          return {
            ...cell,
            isHighlighted: true,
          }
        }
        return {
          ...cell,
          isHighlighted: false
        }
      })
    )
  }

  const clearHighlights = () => {
    setGrid(
      grid.map((cell) => ({
        ...cell,
        isHighlighted: false
      }))
    )
  }

  return (
    <div className='sudoku'>
      {grid.map((cell) => (
        <Cell 
          key={cell.id} 
          highlightMates={highlightMates}
          clearHighlights={clearHighlights}
          cellMates={getCellMates(grid, cell)}
          {...cell} 
        />
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
