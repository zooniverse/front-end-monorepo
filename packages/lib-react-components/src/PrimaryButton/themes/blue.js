import { adjustHue } from 'polished'
import getGradientShade from '../helpers/getGradientShade'
import { normalizeColor } from 'grommet/utils'

const BLUE = '#43BBFD'

const theme = {
  button: {
    border: {
      color: BLUE,
      width: '1px'
    },
    color: {
      dark: 'neutral-4',
      light: 'white'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: BLUE
      }
    },
    extend: props => {
      const color = normalizeColor(BLUE, props.theme)
      const gradientShade = getGradientShade(color)

      return `
        transition: none;
        text-align: center;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          background: linear-gradient(${color}, ${gradientShade});
          box-shadow: none;
        }
        &:active:not(:disabled) {
          background: linear-gradient(${gradientShade}, ${color});
        }
    `}
  }
}

export default theme
