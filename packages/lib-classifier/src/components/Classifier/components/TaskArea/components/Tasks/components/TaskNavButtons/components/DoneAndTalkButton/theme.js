import { darken } from 'polished'
const BLUE = '#44aae5'

const theme = {
  button: {
    border: {
      color: {
        dark: BLUE,
        light: BLUE
      },
      width: '1px'
    },
    color: 'white',
    extend: props => `
      flex: 1 1 auto;
      text-transform: capitalize;
      background: ${props.theme.dark
    ? props.theme.global.colors['dark-3']
    : BLUE
};

      &:disabled:hover {
        cursor: not-allowed;
      }

      &:focus:not(:disabled),
      &:hover:not(:disabled) {
        box-shadow: none;
        background: ${darken(0.18, BLUE)};
      }
    `,
    padding: {
      horizontal: props => props.theme.global.edgeSize.small,
      vertical: props => props.theme.global.edgeSize.xsmall
    }
  }
}

export default theme
