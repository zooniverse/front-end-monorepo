import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import helpIcon from './helpIcon'
import { Box } from 'grommet'
import WithHoverOrFocusProp from '../WithHoverOrFocusProp'

const StyledButton = styled.button`
  background: #00979D;
  border: 1px solid #00979D;
  color: white;
  cursor: pointer;
  letter-spacing: 1px;
  opacity: ${props => (props.hoverOrFocus) ? '0.7' : '1'};
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
      eventHandlers,
      hoverOrFocus
    } = this.props

    return (
      <StyledButton
        {...eventHandlers}
        aria-label='Open Field Guide'
        hoverOrFocus={hoverOrFocus}
        onClick={this.onClick}
      >
        <Box align='center' pad='small'>
          <div>Field</div>
          <div>Guide</div>
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

export default WithHoverOrFocusProp(FieldGuideButton)
