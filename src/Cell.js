const Cell = ({
  id,
  row,
  column,
  initialValue,
  currentValue,
  onClick,
  isIncorrect,
  highlightMates,
  highlightSameValues,
  clearHighlights,
  isMateHighlighted,
  isSameValueHighlighted,
}) => {

  const classList = [ 
    'cell',
    `row-${row}`,
    `col-${column}`,
    initialValue ? 'initial' : 'editable',
    isIncorrect && 'incorrect',
    isMateHighlighted && 'highlight-mates',
    isSameValueHighlighted && 'highlight-mates',
  ]

  const handleFocus = () => {
    onClick(id);
    highlightMates(id);
    highlightSameValues(id, currentValue);
  };

  const handleBlur = () => {
    clearHighlights();
  }

  return (
    <div
      className={classList.join(' ').trim()}
      tabIndex="0"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {currentValue || initialValue}
    </div>
  );
}

export default Cell;