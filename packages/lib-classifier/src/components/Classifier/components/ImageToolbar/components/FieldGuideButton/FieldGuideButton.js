import counterpart from 'counterpart'
import { Box } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withFocusProps, withHoverProps } from '@klarna/higher-order-components'

import en from './locales/en'
import helpIcon from './helpIcon'

counterpart.registerTranslations('en', en)

const StyledButton = styled.button`
  background: #00979D;
  border: 1px solid #00979D;
  color: white;
  cursor: pointer;
  letter-spacing: 1px;
  opacity: ${props => (props.hoveredOrFocused) ? '0.7' : '1'};
  padding: 0;
  text-transform: uppercase;
  width: 100%;

  svg {
    margin-top: 0.5rem;
    width: 50%;

    path {
      fill: white;
    }
  }
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
        <Box align='center' pad='small'>
          <div>{counterpart('FieldGuideButton.buttonLabel.field')}</div>
          <div>{counterpart('FieldGuideButton.buttonLabel.guide')}</div>
          {helpIcon}
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
