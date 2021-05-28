import { normalizeColor } from 'grommet/utils'
import { getGradientShade } from '@zooniverse/react-components'
import { css } from 'styled-components'

const theme = {
  button: {
    border: {
      color: 'accent-2',
      width: '1px'
    },
    color: 'black',
    primary: {
      color: {
        dark: 'dark-3',
        light: 'neutral-2'
      }
    },
    extend: props => {
      const { theme: { global: { colors } }, completeness } = props
      const color = normalizeColor(colors['neutral-2'], props.theme)
      const secondaryColor = getGradientShade(color)
      const percentComplete = `${completeness}%`
      const progressGradient = [
        `${colors['accent-2']} ${percentComplete}`,
        `transparent ${percentComplete}`
      ].join(',')

      return css`
        background: ${color};
        box-shadow: 0px 2px 6px rgba(0, 0, 0, .3);
        position: relative;
        text-align: left;
        transition-property: color, border-color, box-shadow;
        > div {
          justify-content: space-between;
        }
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
