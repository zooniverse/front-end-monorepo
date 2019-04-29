import { darken } from 'polished'

const theme = {
  button: {
    border: {
      color: {
        dark: 'accent-1',
        light: 'status-ok'
      },
      width: '1px'
    },
    color: 'white',
    extend: props => `
      flex: 1 1 auto;
      text-transform: capitalize;
      background: ${props.theme.dark
    ? props.theme.global.colors['dark-3']
    : props.theme.global.colors['status-ok']
};

      &:disabled:hover {
        cursor: not-allowed;
      }

      &:focus:not(:disabled),
      &:hover:not(:disabled) {
        box-shadow: none;
        background: ${props.theme.dark
    ? props.theme.global.colors['status-ok']
    : darken(0.15, props.theme.global.colors['status-ok'])
};
      }
    `,
    padding: {
      horizontal: props => props.theme.global.edgeSize.small,
      vertical: props => props.theme.global.edgeSize.xsmall
    }

  }
}

export default theme
