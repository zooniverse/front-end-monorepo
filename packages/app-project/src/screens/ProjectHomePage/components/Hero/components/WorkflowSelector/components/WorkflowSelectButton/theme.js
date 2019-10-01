import { adjustHue } from 'polished'

const theme = {
  button: {
    border: {
      color: 'neutral-4',
      width: '1px'
    },
    color: {
      dark: 'neutral-4',
      light: 'black'
    },
    extend: props => {
      const { theme: { dark, global: { colors } } } = props
      
      return `
        text-align: center;
        background: ${dark ? colors['dark-3'] : colors['neutral-4']};
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: ${dark ? colors['neutral-4'] : adjustHue(-7, colors['neutral-4'])};
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
          color: ${dark ? 'black' : 'white'};
        }
    `}
  }
}

export default theme
