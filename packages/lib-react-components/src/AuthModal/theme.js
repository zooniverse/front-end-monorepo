import { css } from 'styled-components'

const theme = {
  checkBox: {
    border: {
      width: '1px'
    },
    check: {
      radius: '0px'
    },
    gap: 'xsmall',
    size: '16px'
  },
  formField: {
    border: {
      side: 'all',
      error: {
        color: {
          dark: 'status-error',
          light: 'status-critical'
        }
      }
    },
    error: {
      color: {
        dark: 'status-error',
        light: 'status-critical'
      },
      margin: { top: 'xsmall', bottom: 'none', horizontal: 'none' }
    },
    extend: css`
      & > span {
        font-style: italic;
        margin-top: 5px;
        order: 1;
      }
    `,
    help: {
      color: {
        light: 'dark-5',
        dark: 'light-1'
      },
      margin: {
        left: 'none'
      }
    },
    label: {
      margin: {
        horizontal: 'none',
        vertical: 'xsmall'
      }
    },
    margin: {
      bottom: 'xsmall'
    }
  },
  textInput: {
    extend: props => css`
      color: ${props.theme.dark
    ? props.theme.global.colors['white']
    : props.theme.global.colors['dark-1']
};
      font-weight: 400;
    `
  }
}

export default theme
