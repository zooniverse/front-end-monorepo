import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'grommet'
import styled, { css } from 'styled-components'
import { withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from './locales/en'
import theme from './theme'

counterpart.registerTranslations('en', en)

export const StyledBackButtonWrapper = styled.div`
  margin-right: 1ch;
  position: relative;
  flex: 0 0 33%;
`

// Firefox returns CSS.supports('width', 'max-content') as false
// even though CanIUse reports it is supported by Firefox
// Only the vendor prefixed -moz-max-content returns true
export const StyledBackButtonToolTip = styled.span`
  bottom: '-100%';
  box-sizing: border-box;
  ${props => props.theme.dark ? 
    css`color: ${props.theme.global.colors['accent-2']};` :
    css`color: ${props.theme.global.colors.brand};`
  }
  font-size: 0.9em;
  left: 0;
  padding: 1em 0;
  position: absolute;
  width: max-content;
  width: -moz-max-content;

  .rtl & {
    left: auto;
    right: 0;
  }
  `
function BackButton({
  autoFocus = false,
  disabled = false,
  onClick = () => true,
  persistAnnotations = false,
  theme = {
    dark: false
  }
}) {
  const [ showWarning, setShowWarning ] = useState(false)
  let tooltipEventHandlers = {}

  if (!persistAnnotations) {
    function showTooltip() {
      if (!persistAnnotations && !showWarning) {
        setShowWarning(true)
      }
    }

    function hideTooltip() {
      if (!persistAnnotations && showWarning) {
        setShowWarning(false)
      }
    }

    tooltipEventHandlers = {
      onMouseEnter: showTooltip,
      onFocus: showTooltip,
      onMouseLeave: hideTooltip,
      onBlur: hideTooltip
    }
  }

  // TODO convert to use Grommet Button and Drop for tooltip: https://codesandbox.io/s/rj0y95jr3n
  const backButtonWarning = counterpart('BackButton.tooltip')
  return (
    <StyledBackButtonWrapper theme={theme}>
      <Button
        focusIndicator={false}
        label={<Text size='small'>{counterpart('BackButton.back')}</Text>}
        onClick={onClick}
        {...tooltipEventHandlers}
      />
      {showWarning &&
        <StyledBackButtonToolTip>
          {counterpart('BackButton.tooltip')}
        </StyledBackButtonToolTip>}
    </StyledBackButtonWrapper>
  )
}

BackButton.propTypes = {
  persistAnnotations: PropTypes.bool,
  theme: PropTypes.object
}

export default withThemeContext(BackButton, theme)
export { BackButton }
