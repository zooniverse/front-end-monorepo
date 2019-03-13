import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import theme from 'styled-theming'
import { darken, lighten } from 'polished'
import zooTheme from '@zooniverse/grommet-theme'
import { Tab } from 'grommet'

function getTabColor (colorTheme, color) {
  if (colorTheme === 'light') return zooTheme.global.colors[color.light]

  return zooTheme.global.colors[color.dark]
}

function getHoverStyles (which, colorTheme) {
  const styles = {
    gradientTop: {
      dark: darken(0.04, zooTheme.global.colors['neutral-2']),
      light: lighten(0.05, zooTheme.global.colors['accent-2'])
    },
    gradientBottom: {
      dark: darken(0.11, zooTheme.global.colors['neutral-2']),
      light: darken(0.11, zooTheme.global.colors['accent-2'])
    }
  }

  return styles[which][colorTheme]
}

// If we decide this should be the default look of all tabs, then a lot of this can be moved into the theme
const StyledTab = styled(Tab)`
  background: ${props => props.active
    ? getTabColor(props.theme.mode, { light: 'white', dark: 'dark-3' })
    : getTabColor(props.theme.mode, { light: 'light-1', dark: 'dark-2' })
};
  color: ${props => props.active
    ? getTabColor(props.theme.mode, { light: 'black', dark: 'light-1' })
    : getTabColor(props.theme.mode, { light: 'dark-5', dark: 'light-5' })
};
  flex: 1;
  height: 100%;
  max-height: 55px;
  padding: 1rem;
  text-align: center;

  &:last-of-type {
    border-left: 1px solid ${(props) => getTabColor(props.theme.mode, { light: 'light-3', dark: 'dark-1' })};
  }

  &:hover, &:focus {
    background: ${props => props.active
    ? 'inherit'
    : `linear-gradient(${getHoverStyles('gradientTop', props.theme.mode)}, ${getHoverStyles('gradientBottom', props.theme.mode)})`
};
  }
`

function TaskTab (props) {
  const { title } = props
  return (
    <StyledTab
      plain
      title={title}
      {...props}
    />
  )
}

TaskTab.defaultProps = {
  theme: {
    mode: 'light'
  }
}

TaskTab.propTypes = {
  theme: PropTypes.shape({
    mode: PropTypes.oneOf(['light', 'dark'])
  }),
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
}

export default withTheme(TaskTab)
