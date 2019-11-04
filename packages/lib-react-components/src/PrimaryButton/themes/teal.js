import { adjustHue } from 'polished'
import getGradientShade from '../helpers/getGradientShade'
import { normalizeColor } from 'grommet/utils'

const theme = {
  button: {
    border: {
      color: 'brand',
      width: '1px'
    },
    color: {
      dark: 'brand',
      light: 'white'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'brand'
      }
    },
    extend: props => {
      const color = normalizeColor('brand', props.theme)
      const gradientShade = getGradientShade(color)

      return `
        text-align: center;
        background: linear-gradient(${color}, ${color});
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
