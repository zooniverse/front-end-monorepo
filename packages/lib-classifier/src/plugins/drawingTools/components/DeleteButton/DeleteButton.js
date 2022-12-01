import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled, { css, withTheme } from 'styled-components'

const StyledGroup = styled('g')`
  &:focus {
    ${props => css`outline: solid 4px ${props.focusColor};`}
  }

  &:hover {
    cursor: pointer;
  }
`

function DeleteButton ({ label, mark, onDelete, onDeselect, rotate, scale, theme }) {
  const focusColor = theme.global.colors[theme.global.colors.focus]
  const RADIUS = (screen.width < 900) ? 11 : 8
  const STROKE_COLOR = 'white'
  const FILL_COLOR = 'black'
  const STROKE_WIDTH = 1.5
  const CROSS_PATH = `
    M ${-1 * RADIUS * 0.7} 0
    L ${RADIUS * 0.7} 0
    M 0 ${-1 * RADIUS * 0.7}
    L 0 ${RADIUS * 0.7}
  `
  const { x, y } = mark.deleteButtonPosition(scale)
  const transform = `
    translate(${x}, ${y})
    rotate(${rotate})
    scale(${1 / scale})
  `
  function onKeyDown (event) {
    switch (event.key) {
      case 'Enter':
      case ' ': {
        return onPointerDown(event)
      }
      default: {
        return true
      }
    }
  }

  function onPointerDown (event) {
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
      onBlur={onDeselect}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      role='button'
      stroke={STROKE_COLOR}
      strokeWidth={STROKE_WIDTH}
      tabIndex='-1'
      transform={transform}
    >
      <circle
        fill={FILL_COLOR}
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
DeleteButton.defaultProps = {
  onDelete: () => true,
  onDeselect: () => true,
  rotate: 0,
  scale: 1,
  theme: {
    global: {
      colors: {}
    }
  }
}

export default withTheme(observer(DeleteButton))
export { DeleteButton }
