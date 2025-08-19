const Cell = ({
  id,
  row,
  column,
  initialValue,
  currentValue,
  isValid,
  onValueChange,
  cellMates,
  isHighlighted,
  highlightMates,
  highlightSameValues,
  clearHighlights,
}) => {
  const isPrefilled = initialValue !== null;

  const handleKeyDown = (e) => {
    if (isPrefilled) return;
    if (/[1-9]/.test(e.key)) {
      onValueChange(id, e.key)
    } else if (e.key === "Backspace" || e.key === "Delete") {
      onValueChange(id, null);
    }
  }

  const handleFocus = () => {
    highlightMates(cellMates);
    highlightSameValues(id, currentValue);
  }

  const handleBlur = () => {
    clearHighlights();
  }

  const classList = [
    'cell',
    `row-${row}`,
    `col-${column}`,
    isPrefilled ? 'prefilled' : 'editable',
    isHighlighted && 'highlight',
    !isValid && 'invalid',
  ]
  return (
    <div 
      className={classList.join(' ').trim()} 
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex="0"
    >
      <span>{currentValue}</span>
    </div>
  )
}

export default Cell;