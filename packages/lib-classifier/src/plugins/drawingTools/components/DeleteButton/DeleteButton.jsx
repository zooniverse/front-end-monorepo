import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled, { css, withTheme } from 'styled-components'

import useSVGContext from '@plugins/drawingTools/hooks/useSVGContext'
import DeleteIcon from './DeleteIcon'

const StyledGroup = styled('g')`
  &:focus {
    ${props => css`outline: solid 4px ${props.focusColor};`}
  }

  &:hover {
    cursor: pointer;
  }
`

const DEFAULT_HANDLER = () => false
const DEFAULT_THEME = { global: { colors: {} } }

function DeleteButton({
  label,
  mark,
  onDelete = DEFAULT_HANDLER,
  onDeselect = DEFAULT_HANDLER,
  rotate = 0,
  theme = DEFAULT_THEME
}) {
  const { scale } = useSVGContext()
  const focusColor = theme.global.colors[theme.global.colors.focus]
  const radius = (window?.innerWidth < 900) ? 5 : 8
  const { x, y } = mark.deleteButtonPosition(scale)

  function onKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') return onPointerDown(event)
    return true
  }

  function onPointerDown(event) {
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
      tabIndex='-1'
      transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${1 / scale})`}
    >
      <DeleteIcon radius={radius} />
    </StyledGroup>
  )
}

DeleteButton.propTypes = {
  label: PropTypes.string.isRequired,
  mark: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDeselect: PropTypes.func,
  rotate: PropTypes.number,
  theme: PropTypes.object
}

export default withTheme(observer(DeleteButton))
export { DeleteButton }
