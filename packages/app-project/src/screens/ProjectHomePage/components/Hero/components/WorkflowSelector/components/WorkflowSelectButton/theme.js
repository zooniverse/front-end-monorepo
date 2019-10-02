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
    primary: {
      color: {
        dark: 'dark-3',
        light: 'neutral-4'
      }
    },
    extend: props => {
      const { theme: { dark, global: { colors } }, completeness } = props
      const percentComplete = `${parseInt(completeness * 100)}%`
      
      return `
        background: linear-gradient(to right, ${colors['status-critical']} ${percentComplete}, ${colors['neutral-4']} ${percentComplete});
        text-align: center;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: ${dark ? colors['neutral-4'] : adjustHue(-7, colors['neutral-4'])};
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
          color: ${dark ? 'white' : 'black'};
        }
    `}
  }
}

export default theme
