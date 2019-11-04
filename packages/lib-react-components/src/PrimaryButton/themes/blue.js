import { adjustHue } from 'polished'

const theme = {
  button: {
    border: {
      color: 'neutral-5',
      width: '1px'
    },
    color: {
      dark: 'neutral-5',
      light: 'black'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'neutral-5'
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
          background: ${dark ? colors['neutral-5'] : adjustHue(-7, colors['neutral-5'])};
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
          color: black;
        }
    `}
  }
}

export default theme
