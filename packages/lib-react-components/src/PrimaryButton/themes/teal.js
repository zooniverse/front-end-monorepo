import { normalizeColor } from 'grommet/utils/index.js'
import { css } from 'styled-components'
import getGradientShade from '../helpers/getGradientShade.js'

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

        width: 100%;
        max-width: 350px;

        &:disabled {
          cursor: not-allowed;
          pointer-events: 'none';
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
