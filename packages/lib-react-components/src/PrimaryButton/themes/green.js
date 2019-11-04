import { adjustHue } from 'polished'

const theme = {
  button: {
    border: {
      color: 'status-ok',
      width: '1px'
    },
    color: {
      dark: 'status-ok',
      light: 'white'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'status-ok'
      }
    },
    extend: props => {
      const { theme: { dark, global: { colors } } } = props

      return `
        text-align: center;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: ${dark ? colors['status-ok'] : adjustHue(-7, colors['status-ok'])};
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
          color: black;
        }
    `}
  }
}

export default theme
