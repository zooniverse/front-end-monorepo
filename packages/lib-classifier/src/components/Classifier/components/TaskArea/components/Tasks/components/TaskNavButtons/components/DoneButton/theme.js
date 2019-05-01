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
      background: ${props.theme.global.colors['status-ok']};
      box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
      flex: 1 1 50%;
      text-transform: capitalize;

      &:disabled:hover {
        cursor: not-allowed;
      }

      &:focus:not(:disabled),
      &:hover:not(:disabled) {
        background: ${darken(0.15, props.theme.global.colors['status-ok'])};
        box-shadow: none;
      }
    `,
    padding: {
      horizontal: props => props.theme.global.edgeSize.small,
      vertical: props => props.theme.global.edgeSize.xsmall
    }
  }
}

export default theme
