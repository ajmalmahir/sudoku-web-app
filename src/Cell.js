const Cell = ({
  id,
  row,
  column,
  initialValue,
  value,
  onValueChange,
  cellMates,
  isActive,
  isHighlighted,
  highlightMates,
  clearHighlights,
}) => {
  const isPrefilled = initialValue !== null;

  const handleKeyDown = (e) => {
    if (isPrefilled) return;
    if (/[1-9]/.test(e.key)) {
      onValueChange(id, e.key)
    } else if (e.key === "Backspace" || e.key === "Delete") {
      onValueChange(id, null)
    }
  }

  const handleFocus = () => {
    highlightMates(cellMates)
  }

  const handleBlur = () => {
    clearHighlights()
  }

  const classList = [
    'cell',
    `row-${row}`,
    `col-${column}`,
    isPrefilled ? 'prefilled' : 'editable',
    isHighlighted && 'highlight',
    isActive && 'is-active'
  ]
  return (
    <div 
      className={classList.join(' ').trim()} 
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex="0"
    >
      <span>{value}</span>
    </div>
  )
}

export default Cell;