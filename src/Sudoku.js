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
        const matches = newGrid
          .filter(cell => cell.id !== cellId && cell.currentValue === numericValue)
          .map(cell => cell.id)
        console.log(`matching cells for ${cellId}: ${matches}`)
      }
      return newGrid;
    });
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
          currentValue={cell.currentValue}
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