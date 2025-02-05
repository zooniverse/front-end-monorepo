import { css } from 'styled-components'

const tabsTheme = {
  tab: {
    active: {
      color: {
        dark: 'neutral-1',
        light: 'neutral-1'
      }
    },
    border: {
      active: {
        color: 'neutral-1',
      },
      color: {
        dark: 'dark-2',
        light: 'light-5'
      },
      side: 'bottom',
      size: 'small',
    },
    color: { dark: 'white', light: 'light-5' },
    margin: '0'
  },
  tabs: {
    extend: props => {
      return css`
        button[role='tab'] {
          > div {
            width: ${props.size !== 'small' ? '240px' : '175px'};
            align-items: center;
          }
          > div > span {
            font-size: 0.75rem;
          }

          &[aria-selected='true'] {
            > div {
              border-bottom-width: 4px;
            }
            > div > span {
              color: ${props.theme.dark ? '#ffffff' : '#000000'};
              font-weight: 700;
            }
          }
        }
      `
    }
  }
}

export default tabsTheme
