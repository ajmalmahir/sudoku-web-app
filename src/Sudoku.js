import Cell from './Cell';

const Sudoku = ({ 
  grid, 
  onCellSelect, 
  highlightMates, 
  highlightSameValues, 
  clearHighlights,
  isPaused,
  onTogglePause,
}) => {

  return (
    <div className='sudoku-board'>
      {isPaused ? (
        <div className='paused-message'>
          game paused -
          <span onClick={onTogglePause} style={{ cursor: 'pointer' }}>&nbsp;continue</span>
        </div>
      ) : (
        grid.map((cell) => (
          <Cell 
            key={cell.id}
            {...cell}
            onClick={onCellSelect}
            highlightMates={highlightMates}
            highlightSameValues={highlightSameValues}
            clearHighlights={clearHighlights}
          />
        ))
      )}
    </div>
  )

  // return (
  //   <div className="sudoku-board">
  //     {grid.map((cell) => (
  //       <Cell 
  //         key={cell.id}
  //         {...cell}
  //         onClick={onCellSelect}
  //         highlightMates={highlightMates}
  //         highlightSameValues={highlightSameValues}
  //         clearHighlights={clearHighlights}
  //       />
  //     ))}
  //   </div>
  // )
}

export default Sudoku;