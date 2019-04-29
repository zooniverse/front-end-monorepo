const DARK_GREEN = '#034628'

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
      background: ${props.theme.dark
        ? props.theme.global.colors['dark-3']
        : props.theme.global.colors['status-ok']
      };
      flex: 1 1 auto;
      text-transform: capitalize;

      &:disabled:hover {
        cursor: not-allowed;
      }

      &:focus:not(:disabled),
      &:hover:not(:disabled) {
        background: ${DARK_GREEN};
        box-shadow: none;
      }
    `
  }
}

export default theme
