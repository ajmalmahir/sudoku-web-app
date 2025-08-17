import { useState, useMemo } from 'react';

import Cell from './Cell'
import { getCellMates } from './utils';

const Sudoku = (props) => {
  const [puzzleGrid, setPuzzleGrid] = useState(
    props.puzzle.map(cell => ({
      ...cell,
      currentValue: cell.initialValue,
      isValid: true
    }))
  );

  const solutionMap = useMemo(() => {
    return props.solution.reduce((map, cell) => {
      map[cell.id] = cell.initialValue;
      return map;
    }, {});
  }, [props.solution])

  const validateCell = (cellId, value) => {
    if (value === null) return true;
    return parseInt(value) === solutionMap[cellId];
  }

  const updateCellValue = (cellId, newValue) => {
    setPuzzleGrid(prevGrid =>
      prevGrid.map(cell => 
        cell.id === cellId
        ? { 
          ...cell, 
          currentValue: newValue,
          isValid: validateCell(cellId, newValue, props.solution)
        }
        : cell
      )
    );
  };

  const highlightMates = (cellMates) => {
    setPuzzleGrid(
      puzzleGrid.map((cell) => {
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
    setPuzzleGrid(
      puzzleGrid.map((cell) => ({
        ...cell,
        isHighlighted: false
      }))
    )
  }

  return (
    <div className='sudoku'>
      {puzzleGrid.map((cell) => (
        <Cell 
          key={cell.id} 
          value={cell.currentValue}
          onValueChange={updateCellValue}
          highlightMates={highlightMates}
          clearHighlights={clearHighlights}
          cellMates={getCellMates(puzzleGrid, cell)}
          {...cell} 
        />
      ))}
    </div>
  )
}

export default Sudoku;