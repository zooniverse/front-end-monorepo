import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'

const StyledRect = styled.rect`
  ${props => props.panning ?
   css`cursor: move;` :
   css`cursor: inherit;`}
  overscroll-behavior: none;

  &:focus {
    ${props => 
      css`
        outline-color: ${props.focusColor};
        border: solid thick ${props.focusColor};
        box-shadow: 0 0 4px 4px ${props.focusColor};
      `
    }
  }
`

function ZoomEventLayer (props) {
  const {
    height,
    left,
    onDoubleClick,
    onKeyDown,
    onMouseDown,
    onMouseEnter,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onWheel,
    panning,
    theme,
    top,
    width,
    ...rest
  } = props

  const focusColor = theme.global.colors[theme.global.colors.focus]
  return (
    <StyledRect
      fill='transparent'
      focusColor={focusColor}
      height={height}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
      panning={(panning) ? 'true' : undefined}
      transform={`translate(${left}, ${top})`}
      width={width}
      {...rest}
    />
  )
}

ZoomEventLayer.defaultProps = {
  left: 0,
  onDoubleClick: () => {},
  onKeyDown: () => {},
  onMouseEnter: () => {},
  onWheel: () => {},
  panning: false,
  theme: {
    global: {
      colors: {}
    }
  },
  top: 0
}

ZoomEventLayer.propTypes = {
  height: PropTypes.number.isRequired,
  left: PropTypes.number,
  onDoubleClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onWheel: PropTypes.func,
  panning: PropTypes.bool,
  theme: PropTypes.object,
  top: PropTypes.number,
  width: PropTypes.number.isRequired
}

export default withTheme(ZoomEventLayer)
export { ZoomEventLayer }
