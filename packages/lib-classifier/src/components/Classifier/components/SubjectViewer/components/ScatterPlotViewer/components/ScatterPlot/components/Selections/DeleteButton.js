import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const StyledGroup = styled('g')`
  &:focus {
    ${props => css`outline: solid 4px ${props.focusColor};`}
  }

  &:hover {
    cursor: pointer;
  }
`
const DEFAULT_HANDLER = () => true
  
export default function DeleteButton({
  colors,
  cx,
  cy,
  fill = 'black',
  label,
  onDelete = DEFAULT_HANDLER,
  opacity = 1,
  rotate = 0,
  stroke = 'white',
  strokeWidth = 1.5
}) {
  const focusColor = colors.focus
  const RADIUS = (screen.width < 900) ? 11 : 8
  const CROSS_PATH = `
    M ${-1 * RADIUS * 0.7} 0
    L ${RADIUS * 0.7} 0
    M 0 ${-1 * RADIUS * 0.7}
    L 0 ${RADIUS * 0.7}
  `
  const transform = `
    translate(${cx}, ${cy})
    rotate(${rotate})
  `
  function onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
      case ' ': {
        return onPointerUp(event)
      }
      default: {
        return true
      }
    }
  }

  function onPointerUp(event) {
    event.preventDefault()
    event.stopPropagation()
    onDelete()
    return false
  }

  return (
    <StyledGroup
      aria-label={label}
      focusable
      focusColor={focusColor}
      onKeyDown={onKeyDown}
      onPointerUp={onPointerUp}
      opacity={opacity}
      role='button'
      stroke={stroke}
      strokeWidth={strokeWidth}
      tabIndex='-1'
      transform={transform}
    >
      <circle
        fill={fill}
        r={RADIUS}
      />
      <path
        d={CROSS_PATH}
        transform='rotate(45)'
      />
    </StyledGroup>
  )
}

DeleteButton.propTypes = {
  label: PropTypes.string.isRequired,
  mark: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDeselect: PropTypes.func,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  theme: PropTypes.object
}
