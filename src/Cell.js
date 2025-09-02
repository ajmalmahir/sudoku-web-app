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
  isComplete,
}) => {

  const classList = [ 
    'cell',
    `row-${row}`,
    `col-${column}`,
    initialValue ? 'initial' : 'editable',
    isIncorrect && 'incorrect',
    isMateHighlighted && 'highlight-mates',
    isSameValueHighlighted && 'highlight-mates',
    isComplete && 'complete-wave',
  ]

  const handleFocus = () => {
    onClick(id);
    highlightMates(id);
    highlightSameValues(id, currentValue);
  };

  const handleBlur = () => {
    clearHighlights();
  }

  const animationStyle = isComplete ? {
    animationDelay: `${(row - 1 + column - 1) * 0.08}s`
  } : {};

  return (
    <div
      className={classList.join(' ').trim()}
      tabIndex="0"
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={animationStyle}
    >
      {currentValue || initialValue}
    </div>
  );
}

export default Cell;