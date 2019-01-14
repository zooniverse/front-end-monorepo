import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Box, DropButton as GrommetButton } from 'grommet'
import { pxToRem, SpacedText } from '@zooniverse/react-components'
import zooTheme from '@zooniverse/grommet-theme'

const StyledButton = styled(GrommetButton)`
  background-color: ${props => (props.active) ? '#00979D' : 'inherit'};
  border-radius: 50%;

  &:hover, &:focus {
    background-color: ${zooTheme.global.colors.lightTeal};
    border-radius: 0% 50% 50% 0%;
  }

  > * svg {
    fill: ${props => (props.active) ? 'white' : 'black'};
    stroke: transparent;
    width: ${pxToRem(18)};
  }
`

// The drop content is otherwise 2 pixels smaller in height for some reason
// dislike having to set this...
// Maybe there's something in the theme we can modify?
const StyledSpacedText = styled(SpacedText)`
  line-height: 24px;
  height: 24px;
`

export function Tip({ label }) {
  return (
    <Box background={zooTheme.global.colors.lightTeal} pad='small'>
      <StyledSpacedText color="black">{label}</StyledSpacedText>
    </Box>
  )
}

class Button extends React.Component {
  constructor() {
    super()

    this.state = {
      showTooltip: false
    }

    this.showTooltip = this.showTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)
  }

  showTooltip() {
    this.setState({ showTooltip: true })
  }

  hideTooltip() {
    this.setState({ showTooltip: false })
  }

  render () {
    const {
      active,
      icon,
      onClick
    } = this.props

    // Current version of grommet adds a tabindex of -1 to targets of Drop and the DropButton
    // Open issue for this: https://github.com/grommet/grommet/issues/2660
    return (
      <StyledButton
        active={active}
        dropAlign={{ right: 'left' }}
        dropContent={<Tip label={this.props['aria-label']} />}
        icon={icon}
        margin={{ bottom: 'xsmall' }}
        onBlur={this.hideTooltip}
        onClick={onClick}
        onFocus={this.showTooltip}
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
        open={this.state.showTooltip}
        pad='small'
      />
    )
  }
}

Button.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

Button.defaultProps = {
  active: false,
  onClick: () => {}
}

export default Button