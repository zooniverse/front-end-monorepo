import { darken, lighten } from 'polished'
import { css } from 'styled-components'

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
    extend: props => {
      const tabHeaderColor = getTabHeaderColor(props)
      const borderColor = getBorderColor(props)
      const activeTabHeaderColor = getActiveTabHeaderColor(props)
      const hoverBackgroundColor = getHoverBackground(props)
      const tabChildren = props.children?.[0]?.props?.children
      const flexBasis = tabChildren
        ? `${100 / tabChildren.length}%`
        : 'auto'
      return css`
        button[role="tab"] {
          color: ${tabHeaderColor};
          flex: 1 1 ${flexBasis};
          > div {
            border-bottom: 1px solid ${borderColor};
            border-right: 1px solid ${borderColor};
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
              border-bottom: 1px solid transparent;
              color: ${activeTabHeaderColor};
            }
          }

          &:enabled[aria-selected="false"] > div {
            &:focus,
            &:hover {
              background: ${hoverBackgroundColor};
            }
          }
        }
    `},
    header: {
      background: {
        dark: 'dark-2',
        light: 'light-1'
      },
      extend: props => {
        const borderColor = getBorderColor(props)
        return css`
          border-left: 1px solid ${borderColor};
          border-right: 1px solid ${borderColor};
          border-top: 1px solid ${borderColor};
          text-align: center;
        `
      }
    },
    panel: {
      extend: props => {
        const backgroundColor = getBackgroundColor(props)
        const borderColor = getBorderColor(props)
        return css`
          background-color: ${backgroundColor};
          border-bottom: 1px solid ${borderColor};
          border-left: 1px solid ${borderColor};
          border-right: 1px solid ${borderColor};
          padding: 30px;
        `
      }
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
  const color = getFromTheme(props, 'neutral-1', 'accent-1')
  const darkColors = [darken(0.04, color), darken(0.11, color)]
  const lightColors = [lighten(0.05, color), darken(0.11, color)]
  const activeColors = props.theme.dark ? darkColors : lightColors

  return css`linear-gradient(${activeColors[0]}, ${activeColors[1]});`
}

function getTabHeaderColor (props) {
  return getFromTheme(props, 'light-5', 'dark-5')
}
