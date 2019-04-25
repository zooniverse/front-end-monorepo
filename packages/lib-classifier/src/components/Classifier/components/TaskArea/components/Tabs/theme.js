import { darken, lighten } from 'polished'

const theme = {
  tab: {
    active: {
      background: {
        dark: 'dark-3',
        light: 'white'
      }
    },
    background: {
      dark: 'dark-2',
      light: 'light-1'
    },
    hover: {
      color: {
        dark: 'light-5',
        light: 'dark-5'
      }
    },
    margin: 'none',
    pad: 'small'
  },
  tabs: {
    extend: props => `
      button[role="tab"] {
        color: ${getTabHeaderColor(props)};
        flex: 1 1 ${100 / props.children.length}%;
        > div {
          border-bottom: 1px solid ${getBorderColor(props)};
          border-right: 1px solid ${getBorderColor(props)};
        }

        &:last-of-type > div {
          border-right: none;
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 1;
        }

        &[aria-selected="true"] {
          pointer-events: none;
          > div {
            border-bottom: 1px solid ${getBackgroundColor(props)};
            color: ${getActiveTabHeaderColor(props)};
          }
        }

        &:enabled[aria-selected="false"] > div {
          &:focus,
          &:hover {
            background: ${getHoverBackground(props)};
          }
        }
      }
    `,
    header: {
      background: {
        dark: 'dark-2',
        light: 'light-1'
      },
      extend: props => `
        border-left: 1px solid ${getBorderColor(props)};
        border-right: 1px solid ${getBorderColor(props)};
        border-top: 1px solid ${getBorderColor(props)};
        text-align: center;
      `
    },
    panel: {
      extend: props => `
        background-color: ${getBackgroundColor(props)};
        border-bottom: 1px solid ${getBorderColor(props)};
        border-left: 1px solid ${getBorderColor(props)};
        border-right: 1px solid ${getBorderColor(props)};
        padding: 30px;
      `
    }
  }
}

export default theme

function getActiveTabHeaderColor (props) {
  return getFromTheme(props, 'white', 'black')
}

function getBackgroundColor (props) {
  return getFromTheme(props, 'dark-3', 'white')
}

function getBorderColor (props) {
  return getFromTheme(props, 'dark-1', 'light-3')
}

function getFromTheme (props, darkColor, lightColor) {
  return props.theme.dark
    ? props.theme.global.colors[darkColor]
    : props.theme.global.colors[lightColor]
}

function getHoverBackground (props) {
  const color = getFromTheme(props, 'neutral-2', 'accent-2')
  const darkColors = [darken(0.04, color), darken(0.11, color)]
  const lightColors = [lighten(0.05, color), darken(0.11, color)]
  const activeColors = props.theme.dark ? darkColors : lightColors

  return `linear-gradient(${activeColors[0]}, ${activeColors[1]})`
}

function getTabHeaderColor (props) {
  return getFromTheme(props, 'light-5', 'dark-5')
}
