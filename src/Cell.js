const Cell = ({
  id,
  row,
  column,
  initialValue,
}) => {
  const classList = [
    'cell',
    `row-${row}`,
    `col-${column}`,
  ]
  return (
    <div 
      className={classList.join(' ').trim()} 
      tabIndex="0" // makes div focusable
    >
      <span>{initialValue}</span>
    </div>
  )
}

export default Cell;