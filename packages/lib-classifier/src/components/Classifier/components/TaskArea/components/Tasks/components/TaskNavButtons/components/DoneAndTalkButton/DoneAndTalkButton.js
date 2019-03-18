import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'grommet'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import { darken, lighten } from 'polished'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// Taken from PFE on 2019.02.28; these colours aren't part of the current theme.
const TALK_LINK_BLUE = '#43bbfd';
const TALK_LINK_BLUE_HOVER = darken(0.18, TALK_LINK_BLUE);
const TALK_LINK_BLUE_HOVER_DARK = '#104A79';

// TODO move what makes sense into theme
export const StyledDoneAndTalkButton = styled(Button)`
  background-color: ${theme('mode', {
    dark: zooTheme.global.colors['dark-1'],
    light: TALK_LINK_BLUE
  })};
  border: ${theme('mode', {
    dark: `solid thin ${TALK_LINK_BLUE}`,
    light: `solid thin ${TALK_LINK_BLUE_HOVER}`
  })};
  box-shadow: none;
  color: white;
  flex: 3 0;
  margin-right: 1ch;
  padding: 0.5em;
  text-transform: capitalize;
  
  > i {
    margin-left: 1ch;
  }

  &:hover, &:focus {
    background: ${theme('mode', {
      dark: TALK_LINK_BLUE_HOVER_DARK,
      light: TALK_LINK_BLUE_HOVER
    })};
    border: ${theme('mode', {
      dark: `solid thin ${TALK_LINK_BLUE}`,
      light: `solid thin ${TALK_LINK_BLUE_HOVER}`
    })};
    box-shadow: none;
    color: ${theme('mode', {
      dark: zooTheme.global.colors.text.dark,
      light: `white`
    })};
  }

  &:disabled {
    cursor: not-allowed;
  }
  `

export function DoneAndTalkButton (props) {
  const openTalkLinkAndClick = function (event) {
    const isCmdClick = event.metaKey

    props.onClick(event)
      .then(() => {
        if (window && props.talkURL) {
          const url = `${window.location.origin}${props.talkURL}`
          if (isCmdClick) {
            event.preventDefault()
            const newTab = window.open()
            newTab.opener = null
            newTab.location = url
            newTab.target = '_blank'
            newTab.focus()
          } else {
            window.location.assign(url)
          }
        }
      })
  }

  if (!props.completed) {
    return (
      <ThemeProvider theme={{ mode: props.theme }}>
        <StyledDoneAndTalkButton
          disabled={props.disabled}
          label={<Text size='small'>{counterpart('DoneAndTalkButton.doneAndTalk')}</Text>}
          onClick={(e) => { openTalkLinkAndClick(e) }}
          type='submit'
        />
      </ThemeProvider>
    )
  }

  return null
}

DoneAndTalkButton.defaultProps = {
  completed: false,
  demoMode: false,  // TODO: add demo mode to classifier
  disabled: false,
  goldStandardMode: false,  // TODO: add gold standard mode to classifier
  onClick: () => {},
  theme: 'light'
}

DoneAndTalkButton.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goldStandardMode: PropTypes.bool,
  onClick: PropTypes.func,
  talkURL: PropTypes.string.isRequired,
  theme: PropTypes.string
}

export default DoneAndTalkButton
