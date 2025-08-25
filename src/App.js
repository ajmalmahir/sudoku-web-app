import './App.css';
import Sudoku from './Sudoku'
import Stopwatch from './Stopwatch';
import InputPad from './InputPad';
import { useState, useMemo } from 'react';
import { sudokuPuzzles } from './SudokuPuzzles';
import { findCellMates, createGrid } from './utils';

function App() {

  const puzzle = sudokuPuzzles.easy[0].puzzle;
  const solution = createGrid(sudokuPuzzles.easy[0].solution);

  const [selectedCellId, setSelectedCellId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [grid, setGrid] = useState(
    () => createGrid(puzzle).map(cell => ({
      ...cell,
      isIncorrect: false,
      isMateHighlighted: false,
      isSameValueHighlighted: false,
    }))
  );

  const handleCellSelect = (cellId) => {
    setSelectedCellId(cellId);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    setSelectedCellId(null);
  }

  const solutionMap = useMemo(() => {
    return solution.reduce((map, cell) => {
      map[cell.id] = cell.initialValue
      return map;
    }, {});
  }, [solution])

  const validateCell = (cellId, value) => {
    if (value == null) return null;
    return solutionMap[cellId] !== value;
  }

  const highlightMates = (cellId) => {
    const mates = findCellMates(grid, cellId);
    setGrid(currentGrid => 
      currentGrid.map((cell) => ({
        ...cell,
        isMateHighlighted: mates.has(cell.id)
      }))
    );
  };

  const clearHighlights = () => {
    setGrid(
      grid.map((cell) => ({
        ...cell,
        isMateHighlighted: false,
        isSameValueHighlighted: false,
      }))
    )
  }

  const highlightSameValues = (cellId, currentValue) => {
    setGrid(currentGrid => {
      if (!currentValue) return currentGrid;
      return currentGrid.map(cell => ({
        ...cell,
        isSameValueHighlighted: (cell.currentValue === currentValue && cell.id !== cellId)
      }));
    });
  }

  const handleNumberInput = (number) => {

    if (!selectedCellId) return;
    const selectedCell = grid.find(cell => cell.id === selectedCellId);
    if (selectedCell && selectedCell.initialValue) return;

    setGrid(currentGrid => {
      const newGrid = currentGrid.map(cell =>
        cell.id === selectedCellId
        ? {
          ...cell,
          currentValue: number,
          isIncorrect: validateCell(selectedCellId, number),
        } : cell
      );
      
      if (number) {
        highlightSameValues(selectedCell.id, number);
      }

      return newGrid;
    })
  };

  const handleClearCell = () => {

    if (!selectedCellId) return;
    const selectedCell = grid.find(cell => cell.id === selectedCellId);
    if (selectedCell && selectedCell.initialValue) return;

    setGrid(currentGrid => {
      const newGrid = currentGrid.map(cell =>
        cell.id === selectedCellId
        ? {
          ...cell,
          currentValue: null,
          isIncorrect: false,
        } : cell
      );
      return newGrid;
    });

    setGrid(currentGrid => 
      currentGrid.map(cell => ({
        ...cell,
        isSameValueHighlighted: false,
      }))
    );
  };

  if (!grid) return <div>Loading...</div>

  return (
    <div>
      <Sudoku 
        grid={grid}
        onCellSelect={handleCellSelect}
        highlightMates={highlightMates}
        highlightSameValues={highlightSameValues}
        clearHighlights={clearHighlights}
        isPaused={isPaused}
        onTogglePause={togglePause}
      />
      <Stopwatch isPaused={isPaused} onTogglePause={togglePause} />
      <InputPad 
        onInput={handleNumberInput}
        onClear={handleClearCell}
      />
    </div>
  )
}

export default App;
