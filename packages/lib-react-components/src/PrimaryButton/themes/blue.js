import { normalizeColor } from 'grommet/utils/index.js'
import { css } from 'styled-components'
import getGradientShade from '../helpers/getGradientShade.js'

const theme = {
  button: {
    border: {
      color: 'neutral-5',
      width: '1px'
    },
    color: {
      dark: 'white',
      light: 'black'
    },
    primary: {
      color: {
        dark: 'dark-3',
        light: 'neutral-5'
      }
    },
    extend: props => {
      const color = normalizeColor('neutral-5', props.theme)
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
          color: black;
          background: linear-gradient(${color}, ${gradientShade});
          box-shadow: none;
        }
        &:active:not(:disabled) {
          color: black;
          background: linear-gradient(${gradientShade}, ${color});
        }
    `}
  }
}

export default theme
