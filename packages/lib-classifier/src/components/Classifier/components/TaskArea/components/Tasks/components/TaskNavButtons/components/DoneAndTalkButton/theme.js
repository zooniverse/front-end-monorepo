const BLUE = '#43bbfd'
const DARK_BLUE = '#104a79'

const theme = {
  button: {
    border: {
      color: BLUE,
      width: '1px'
    },
    color: 'white',
    extend: props => `
      background: ${props.theme.dark
        ? props.theme.global.colors['dark-3']
        : BLUE
      };
      box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
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
    `,
    padding: {
      horizontal: props => props.theme.global.edgeSize.small,
      vertical: props => props.theme.global.edgeSize.xsmall
    }
  }
}

export default theme
