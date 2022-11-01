import { normalizeColor } from 'grommet/utils'
import { css } from 'styled-components'
import { getGradientShade } from '@zooniverse/react-components'

const theme = {
  button: {
    extend: props => {
      const { selected, theme } = props
      const { dark, global: { colors } } = theme
      const color = normalizeColor('accent-1', theme)
      const gradientShade = getGradientShade(color)

      let backgroundColor = colors['neutral-6']
      let textColor = colors['dark-1']
      if (dark) {
        backgroundColor = colors['dark-5']
        textColor = colors['neutral-6']
      }
      if (selected) {
        backgroundColor = colors['brand']
        textColor = colors['neutral-6']
      }

      return css`
        background: ${backgroundColor};
        border: none;
        border-radius: 0px;
        color: ${textColor};
        padding: 5px;
        text-align: start;
        transition: none;
        
        &:disabled {
          cursor: not-allowed;
        }
        
        &:focus:not(:disabled) {
          box-shadow: 0 0 2px 2px ${colors.focus};
        }
        
        &:hover:not(:disabled) {
          background: linear-gradient(${color}, ${gradientShade});
          box-shadow: none;
          color: ${colors['dark-1']};
        }
        
        &:active:not(:disabled) {
          background: linear-gradient(${gradientShade}, ${color});
          color: ${colors['dark-1']};
        }
      `
    }
  }
}

export default theme
