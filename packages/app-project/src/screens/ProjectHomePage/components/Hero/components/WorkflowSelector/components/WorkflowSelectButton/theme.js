import { adjustHue } from 'polished'

const theme = {
  button: {
    border: {
      color: 'neutral-4',
      width: '1px'
    },
    color: 'black',
    primary: {
      color: {
        dark: 'dark-3',
        light: 'neutral-4'
      }
    },
    extend: props => {
      const { theme: { global: { colors } }, completeness } = props
      const percentComplete = `${completeness}%`
      const progressGradient = [
        `${colors['neutral-4']}`,
        `${colors['status-critical']} ${percentComplete}`,
        `white ${percentComplete} calc(${percentComplete} + 1px)`,
        `${colors['neutral-4']} ${percentComplete}`
      ]
      const hoverGradient = [
        `${colors['neutral-4']}`,
        `${adjustHue(7, colors['status-critical'])} ${percentComplete}`,
        `white ${percentComplete} calc(${percentComplete} + 1px)`,
        `${adjustHue(-7, colors['neutral-4'])} ${percentComplete}`
      ]

      return `
        background: linear-gradient(to right, ${progressGradient.join(',')});
        text-align: left;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: linear-gradient(to right, ${hoverGradient.join(',')});
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
          color: 'black';
        }
    `
    }
  }
}

export default theme
