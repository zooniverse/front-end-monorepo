import { string } from 'prop-types'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

const StyledPlaceholderSVG = styled.svg`
  background: no-repeat center / cover url('https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png');
  touch-action: pinch-zoom;
  max-width: ${props => props.$maxWidth};
  ${props => props.$maxHeight && css`max-height: ${props.$maxHeight};`}
`

const PlaceholderSVG = forwardRef(function PlaceholderSVG({
  maxWidth = '100%',
  maxHeight,
  viewBox = '0 0 800 600'
}, ref) {
  return (
    <StyledPlaceholderSVG
      ref={ref}
      data-testid='placeholder-svg'
      focusable
      $maxHeight={maxHeight}
      $maxWidth={maxWidth}
      tabIndex={0}
      viewBox={viewBox}
    />
  )
})

PlaceholderSVG.displayName = 'PlaceholderSVG'

PlaceholderSVG.propTypes = {
  maxWidth: string,
  maxHeight: string,
  viewBox: string
}

export default PlaceholderSVG
