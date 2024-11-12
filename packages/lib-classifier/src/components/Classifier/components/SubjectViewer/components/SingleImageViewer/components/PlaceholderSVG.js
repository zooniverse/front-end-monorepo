import { string } from 'prop-types'
import styled, { css } from 'styled-components'

const StyledPlaceholderSVG = styled.svg`
  background: no-repeat center / cover url('https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png');
  touch-action: pinch-zoom;
  max-width: ${props => props.maxWidth};
  ${props => props.maxHeight && css`max-height: ${props.maxHeight};`}
`

function PlaceholderSVG({
  maxWidth = '100%',
  maxHeight,
  viewBox = '0 0 800 600'
}) {
  return (
    <StyledPlaceholderSVG
      data-testid='placeholder-svg'
      focusable
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      tabIndex={0}
      viewBox={viewBox}
      xmlns='http://www.w3.org/2000/svg'
    />
  )
}

PlaceholderSVG.propTypes = {
  maxWidth: string,
  maxHeight: string,
  viewBox: string
}

export default PlaceholderSVG
