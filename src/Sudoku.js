import { useState, useMemo } from 'react';

import InputPad from './InputPad'
import Cell from './Cell'
import { getCellMates } from './utils';

const Sudoku = (props) => {
  const [puzzleGrid, setPuzzleGrid] = useState(
    props.puzzle.map(cell => ({
      ...cell,
      currentValue: cell.initialValue,
      isValid: true,
      isMateHighlighted: false,
      isSameValueHighlighted: false,
    }))
  );

  const solutionMap = useMemo(() => {
    return props.solution.reduce((map, cell) => {
      map[cell.id] = cell.initialValue;
      return map;
    }, {});
  }, [props.solution])

  const validateCell = (cellId, currentValue) => {
    if (currentValue === null) return true;
    return parseInt(currentValue) === solutionMap[cellId];
  }

  const updateCellValue = (cellId, newValue) => {
    setPuzzleGrid(currentGrid => {
      const numericValue = newValue === null ? null : parseInt(newValue, 10);

      const newGrid = currentGrid.map(cell => 
        cell.id === cellId
          ? {
            ...cell,
            currentValue: numericValue,
            isValid: validateCell(cellId, numericValue)
            }
          : cell
      );

      if (numericValue) {
        highlightSameValues(cellId, numericValue);
      }
      return newGrid;
    });
  };

  const highlightMates = (cellMates) => {
    setPuzzleGrid(currentGrid =>
      currentGrid.map((cell) => ({
        ...cell,
        isMateHighlighted: cellMates.includes(cell.id)
      }))
    );
  };

  const highlightSameValues = (cellId, value) => {
    setPuzzleGrid(currentGrid => {
      if (!value) {
        return currentGrid.map(cell => ({ ...cell, isHighlighted: cell.isHighlighted}))
      }

      return currentGrid.map(cell => ({
        ...cell,
        isSameValueHighlighted: (cell.currentValue === value && cell.id !== cellId)
      }));
    });
  };

  const clearHighlights = () => {
    setPuzzleGrid(
      puzzleGrid.map((cell) => ({
        ...cell,
        isMateHighlighted: false,
        isSameValueHighlighted: false,
      }))
    )
  }

  const [selectedCellId, setSelectedCellId] = useState(null);

  const handleCellSelect = (cellId) => {
    setSelectedCellId(cellId);
  };

  const handlePadInput = (value) => {
    if (selectedCellId === null) return;
    updateCellValue(selectedCellId, value);
  }

  return (
    <div className='sudoku-and-pad'>
      <div className='sudoku'>
        {puzzleGrid.map((cell) => (
          <Cell 
            key={cell.id} 
            currentValue={cell.currentValue}
            onValueChange={updateCellValue}
            onSelect={handleCellSelect}
            isSelected={cell.id === selectedCellId}
            highlightMates={highlightMates}
            highlightSameValues={highlightSameValues}
            clearHighlights={clearHighlights}
            cellMates={getCellMates(puzzleGrid, cell)}
            {...cell} 
          />
        ))}
      </div>

      <InputPad onInput={handlePadInput} />
    </div>
  )
}

export default Sudoku;