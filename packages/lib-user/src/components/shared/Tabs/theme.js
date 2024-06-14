import { css } from 'styled-components'

const tabTheme = {
  tab: {
    color: {
      dark: 'light-3',
      light: 'dark-5'
    },
    border: {
      active: {
        color: 'brand',
      },
      color: {
        dark: 'dark-3',
        light: 'neutral-6'
      },
      side: 'bottom',
      size: 'medium'
    }
  },
  tabs: {
    extend: props => {
      return css`
        button[role="tab"] {
          > div > span {
            font-size: 1em;
          }

          &[aria-selected="true"] {
            > div > span {
              color: ${props.theme.dark ? '#ffffff' : '#000000'};
              font-weight: 700;
            }
          }
        }
      `
    },
  }
}

export default tabTheme
