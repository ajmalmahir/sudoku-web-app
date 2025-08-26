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
          <span onClick={onTogglePause} style={{ cursor: 'pointer' }}>&nbsp;continue&nbsp;
            <svg
              style={{ height: '1em', width: 'auto', verticalAlign: 'middle' }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5,3 19, 12 5,21"></polygon>
            </svg>
          </span>
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