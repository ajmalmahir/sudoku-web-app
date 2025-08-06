import { useState } from "react";

const Cell = ({
  id,
  row,
  column,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue)

  const isPrefilled = initialValue !== null;

  const handleKeyDown = (e) => {
    if (isPrefilled) return;

    if (/[1-9]/.test(e.key)) {
      setValue(e.key)
    }
  }
  const classList = [
    'cell',
    `row-${row}`,
    `col-${column}`,
  ]
  return (
    <div 
      className={classList.join(' ').trim()} 
      onKeyDown={handleKeyDown}
      tabIndex="0" // makes div focusable
    >
      <span>{value}</span>
    </div>
  )
}

export default Cell;