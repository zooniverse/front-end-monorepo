const BLUE = '#43bbfd'
const DARK_BLUE = '#104a79'

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
      background: ${props.theme.dark
        ? props.theme.global.colors['dark-3']
        : BLUE
      };
      flex: 1 1 50%;
      text-transform: capitalize;

      &:disabled:hover {
        cursor: not-allowed;
      }

      &:focus:not(:disabled),
      &:hover:not(:disabled) {
        background: ${DARK_BLUE};
        box-shadow: none;
      }
    `
  }
}

export default theme
