import { normalizeColor } from 'grommet/utils'
import { css } from 'styled-components'
import getGradientShade from '../helpers/getGradientShade'

const theme = {
  button: {
    border: {
      color: 'brand',
      width: '1px'
    },
    color: {
      dark: 'white',
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

      return css`
        transition: none;
        text-align: center;
        &:disabled {
          cursor: not-allowed;
        }
        &:focus:not(:disabled),
        &:hover:not(:disabled) {
          color: white;
          background: linear-gradient(${color}, ${gradientShade});
          box-shadow: none;
        }
        &:active:not(:disabled) {
          color: white;
          background: linear-gradient(${gradientShade}, ${color});
        }
    `}
  }
}

export default theme
