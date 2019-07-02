import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'grommet'
import styled from 'styled-components'
import { withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from './locales/en'
import theme from './theme'

counterpart.registerTranslations('en', en)

export const StyledBackButtonWrapper = styled.div`
  position: relative;
  flex: 1 0;
`

// Firefox returns CSS.supports('width', 'max-content') as false
// even though CanIUse reports it is supported by Firefox
// Only the vendor prefixed -moz-max-content returns true
export const StyledBackButtonToolTip = styled.span`
  bottom: '-100%';
  box-sizing: border-box;
  color: ${(props) => props.theme.dark ?
    props.theme.global.colors['accent-2'] :
    props.theme.global.colors.brand
  };
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

class BackButton extends React.Component {
  constructor () {
    super()

    this.state = {
      showWarning: false
    }

    this.showWarning = this.showWarning.bind(this)
    this.hideWarning = this.hideWarning.bind(this)
  }

  showWarning () {
    if (this.props.areAnnotationsNotPersisted && !this.state.showWarning) {
      this.setState({ showWarning: true })
    }
  }

  hideWarning () {
    if (this.props.areAnnotationsNotPersisted && this.state.showWarning) {
      this.setState({ showWarning: false })
    }
  }

  // TODO convert to use Grommet Button and Drop for tooltip: https://codesandbox.io/s/rj0y95jr3n
  render () {
    const backButtonWarning = counterpart('BackButton.tooltip')
    return (
      <StyledBackButtonWrapper theme={this.props.theme}>
        <Button
          aria-label={(this.props.areAnnotationsNotPersisted ? backButtonWarning : '')}
          focusIndicator={false}
          label={<Text size='small'>{counterpart('BackButton.back')}</Text>}
          onClick={this.props.onClick}
          onMouseEnter={this.showWarning}
          onFocus={this.showWarning}
          onMouseLeave={this.hideWarning}
          onBlur={this.hideWarning}
        />
        {this.state.showWarning &&
          <StyledBackButtonToolTip>
            {counterpart('BackButton.tooltip')}
          </StyledBackButtonToolTip>}
      </StyledBackButtonWrapper>
    )
  }
}

BackButton.defaultProps = {
  areAnnotationsNotPersisted: false,
  theme: { dark: false },
  onClick: () => {}
}

BackButton.propTypes = {
  areAnnotationsNotPersisted: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.object
}

export default withThemeContext(BackButton, theme)
export { BackButton }