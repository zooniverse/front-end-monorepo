import { withFocusProps, withHoverProps } from '@klarna/higher-order-components'
import { SpacedText } from '@zooniverse/react-components'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import en from './locales/en'
import HelpIcon from './HelpIcon'

counterpart.registerTranslations('en', en)

const StyledButton = styled.button`
  height: auto;
  flex-direction: column;
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${zooTheme.global.colors.brand}
  border: 0;
  padding: 15px 10px;
`

const StyledSpacedText = styled(SpacedText)`
  line-height: 1.2;
`

const StyledHelpIcon = styled(HelpIcon)`
  margin-top: 8px;
  display: block;
  fill: white;
  width: 25px;
`

@withHoverProps({ hovered: true })
@withFocusProps({ focused: true })
class FieldGuideButton extends React.Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    console.info('Open field guide')
  }

  render () {
    const {
      focused,
      hovered,
      onBlur,
      onFocus,
      onMouseOver,
      onMouseOut
    } = this.props

    const eventHandlers = {
      onBlur,
      onFocus,
      onMouseOver,
      onMouseOut
    }

    const hoveredOrFocused = hovered || focused

    return (
      <StyledButton
        {...eventHandlers}
        aria-label={counterpart('FieldGuideButton.ariaLabel')}
        hoveredOrFocused={hoveredOrFocused}
        onClick={this.onClick}

      >
        <Box as='span' align='center' direction='column'>
          <StyledSpacedText size='xsmall' color='white'>
            {counterpart('FieldGuideButton.buttonLabel.field')}
          </StyledSpacedText>
          <StyledSpacedText size='xsmall' color='white'>
            {counterpart('FieldGuideButton.buttonLabel.guide')}
          </StyledSpacedText>
          <StyledHelpIcon />
        </Box>
      </StyledButton>
    )
  }
}

FieldGuideButton.propTypes = {
  eventHandlers: PropTypes.object,
  hoverOrFocus: PropTypes.bool
}

export default FieldGuideButton
