import { adjustHue } from 'polished'
import { normalizeColor } from 'grommet/utils'
import { getGradientShade } from '@zooniverse/react-components'

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
      const color = normalizeColor(colors['neutral-4'], props.theme)
      const secondaryColor = getGradientShade(color)
      const percentComplete = `${completeness}%`
      const progressGradient = [
        `${colors['accent-4']} ${percentComplete}`,
        `transparent ${percentComplete}`
      ].join(',')

      return `
        background: ${color};
        box-shadow: 0px 2px 6px rgba(0, 0, 0, .3);
        position: relative;
        text-align: left;
        transition-property: color, border-color, box-shadow;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: linear-gradient(${color}, ${secondaryColor});
          box-shadow: 0px 2px 14px rgba(0, 0, 0, .3);
        }
        &:active:not(:disabled) {
          background: linear-gradient(${secondaryColor}, ${color});
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
