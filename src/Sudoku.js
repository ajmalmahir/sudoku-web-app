import Cell from './Cell';

const Sudoku = ({ 
  grid, 
  onCellSelect, 
  highlightMates, 
  highlightSameValues, 
  clearHighlights 
}) => {

  return (
    <div className="sudoku-board">
      {grid.map((cell) => (
        <Cell 
          key={cell.id}
          {...cell}
          onClick={onCellSelect}
          highlightMates={highlightMates}
          highlightSameValues={highlightSameValues}
          clearHighlights={clearHighlights}
        />
      ))}
    </div>
  )
}

export default Sudoku;