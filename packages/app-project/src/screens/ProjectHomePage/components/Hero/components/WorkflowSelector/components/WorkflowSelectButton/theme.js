import { adjustHue } from 'polished'

const theme = {
  button: {
    border: {
      color: 'accent-4',
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
        `${colors['accent-4']} ${percentComplete}`,
        `transparent ${percentComplete}`
      ].join(',')

      return `
        text-align: left;
        position: relative;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, .3);
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          box-shadow: 0px 2px 14px rgba(0, 0, 0, .3);
        }
        &:before {
          content: "";
          width: 100%;
          position: absolute;
          height: 5px;
          background: linear-gradient(to right, ${progressGradient});
          top: 0;
          left: 0;
        }
    `
    }
  }
}

export default theme
