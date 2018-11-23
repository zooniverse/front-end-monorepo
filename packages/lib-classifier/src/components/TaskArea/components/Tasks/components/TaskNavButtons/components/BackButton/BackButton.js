import React from 'react'
import PropTypes from 'prop-types'
import { Button, Drop, Text } from 'grommet'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledBackButtonWrapper = styled.div`
  margin-right: 1ch;
  position: relative;
  flex: 1 0;
`

export const StyledBackButton = styled(Button)`
  background-color: ${theme('mode', {
    dark: zooTheme.dark.colors.background.default,
    light: zooTheme.light.colors.background.default
  })};
  border: ${theme('mode', {
    dark: `thin solid ${zooTheme.dark.colors.font}`,
    light: 'thin solid transparent'
  })};
  border-radius: 0;
  color: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: zooTheme.light.colors.font
  })};
  height: 100%; /* Why is this needed? */
  padding: 0;
  text-transform: capitalize;
  width: 100%;

  &:focus, &:hover {
    background: ${theme('mode', {
    dark: zooTheme.dark.colors.background.default,
    light: `linear-gradient(
        ${zooTheme.light.colors.button.answer.gradient.top},
        ${zooTheme.light.colors.button.answer.gradient.bottom}
      )`
  })};
    border: ${theme('mode', {
    dark: `thin solid ${zooTheme.dark.colors.button.answer.default}`,
    light: 'thin solid transparent'
  })};
    box-shadow: none;
    color: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: 'black'
  })};
  }
  `

// Firefox returns CSS.supports('width', 'max-content') as false
// even though CanIUse reports it is supported by Firefox
// Only the vendor prefixed -moz-max-content returns true
export const StyledBackButtonToolTip = styled.span`
  bottom: '-100%';
  box-sizing: border-box;
  color: ${theme('mode', {
    dark: zooTheme.global.colors.lightTeal,
    light: zooTheme.global.colors.teal
  })};
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
      <ThemeProvider theme={{ mode: this.props.theme }}>
        <StyledBackButtonWrapper>
          <StyledBackButton
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
      </ThemeProvider>
    )
  }
}

BackButton.defaultProps = {
  areAnnotationsNotPersisted: false,
  theme: 'light',
  onClick: () => {}
}

BackButton.propTypes = {
  areAnnotationsNotPersisted: PropTypes.bool,
  theme: PropTypes.string,
  onClick: PropTypes.func
}

export default BackButton
