import './App.css';
import Sudoku from './Sudoku'
import Stopwatch from './Stopwatch';
import InputPad from './InputPad';
import { useState, useMemo, useEffect } from 'react';
import { sudokuPuzzles } from './SudokuPuzzles';
import { findCellMates, createGrid } from './utils';

function App() {

  const puzzle = sudokuPuzzles.easy[0].puzzle;
  const solution = createGrid(sudokuPuzzles.easy[0].solution);

  const [selectedCellId, setSelectedCellId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(() => {
    const savedGame = localStorage.getItem('boring-sudoku-game-state-v1');
    if (savedGame) {
      const { time } = JSON.parse(savedGame);
      return time || 0;
    }
    return 0;
  });

  const [grid, setGrid] = useState(() => {
    const savedGrid = localStorage.getItem('boring-sudoku-game-state-v1');
    if (savedGrid) {
      const { grid } = JSON.parse(savedGrid);
      return grid;
    }

    return createGrid(puzzle).map(cell => ({
      ...cell,
      isIncorrect: false,
      isMateHighlighted: false,
      isSameValueHighlighted: false,
    }));
  });

  useEffect(() => {
    const gameState = {
      grid,
      time: elapsedTime,
    }
    localStorage.setItem('boring-sudoku-game-state-v1', JSON.stringify(gameState));
  }, [grid, elapsedTime]);

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
    <>
      <div className='page-container'>
        <nav className='navbar'>
          <span className='navbar-title'>sudoku</span>
        </nav>
        <div className='app-container'>
          <div className='board-and-stopwatch'>
            <Sudoku 
              grid={grid}
              onCellSelect={handleCellSelect}
              highlightMates={highlightMates}
              highlightSameValues={highlightSameValues}
              clearHighlights={clearHighlights}
              isPaused={isPaused}
              onTogglePause={togglePause}
            />
            <Stopwatch 
              isPaused={isPaused} 
              onTogglePause={togglePause} 
              initialTime={elapsedTime}
              onTimeUpdate={setElapsedTime}
            />
          </div>
          <InputPad 
            onInput={handleNumberInput}
            onClear={handleClearCell}
          />
        </div>
      </div>
    </>
  )
}

export default App;