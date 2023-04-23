export default function Selection({
  active = false,
  disabled = false,
  fill,
  selection,
  onSelect,
  xScale
}) {
  const x = xScale(selection.x0)
  const width = xScale(selection.x1) - x

  function onClick() {
    if (!disabled) {
      return onSelect(selection)
    }
    return true
  }

  return (
    <rect
      className='selection'
      fill={fill}
      focusable={disabled ? 'false' : 'true'}
      height='100%'
      onClick={onClick}
      opacity={0.5}
      pointerEvents={disabled ? 'none' : 'all'}
      tabIndex={disabled ? '-1' : '0'}
      width={width}
      x={x}
    />
  )
}
