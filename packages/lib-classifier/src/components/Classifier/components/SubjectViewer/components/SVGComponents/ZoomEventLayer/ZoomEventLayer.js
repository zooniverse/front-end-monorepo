import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import withKeyZoom from '../../../../withKeyZoom'

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
    onPointerDown,
    onPointerEnter,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
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
      data-testid='zoom-layer'
      fill='transparent'
      focusColor={focusColor}
      height={height}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
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
  onPointerEnter: () => {},
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
  onPointerDown: PropTypes.func.isRequired,
  onPointerEnter: PropTypes.func,
  onPointerMove: PropTypes.func.isRequired,
  onPointerUp: PropTypes.func.isRequired,
  onPointerLeave: PropTypes.func.isRequired,
  onWheel: PropTypes.func,
  panning: PropTypes.bool,
  theme: PropTypes.object,
  top: PropTypes.number,
  width: PropTypes.number.isRequired
}

export default withTheme(ZoomEventLayer)
export { ZoomEventLayer }
