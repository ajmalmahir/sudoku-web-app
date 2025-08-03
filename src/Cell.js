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
    <div className={classList.join(' ').trim()}>
      <span>{initialValue}</span>
    </div>
  )
}

export default Cell;