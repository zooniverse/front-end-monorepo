import { adjustHue } from 'polished'

const theme = {
  button: {
    border: {
      width: '0'
    },
    color: {
      dark: 'neutral-4',
      light: 'black'
    },
    extend: props => {
      const { theme: { dark, global: { colors } } } = props
      
      return `
        text-align: center;
        background: ${colors['neutral-4']};
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: ${adjustHue(-7, colors['neutral-4'])};
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
          color: white;
        }
    `}
  },
  
}

export default theme
