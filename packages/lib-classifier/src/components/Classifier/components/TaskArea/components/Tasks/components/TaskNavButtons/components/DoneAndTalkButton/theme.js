const BLUE = '#43BBFD'
const DARK_BLUE = '#104A79'

const theme = {
  button: {
    border: {
      color: BLUE,
      width: '1px'
    },
    color: 'white',
    extend: props => {
      const { theme: { dark, global: { colors } } } = props
      return `
        background: ${dark ? colors['dark-3'] : BLUE };
        box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
        flex: 1 1 50%;
        text-transform: capitalize;

        &:disabled:hover {
          cursor: not-allowed;
        }

        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: ${DARK_BLUE};
          border-color: ${BLUE};
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
        }
      `
    },
    padding: {
      horizontal: props => props.theme.global.edgeSize.small,
      vertical: props => props.theme.global.edgeSize.xsmall
    }
  }
}

export default theme
