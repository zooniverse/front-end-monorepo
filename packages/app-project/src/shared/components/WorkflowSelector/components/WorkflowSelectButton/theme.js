import { normalizeColor } from 'grommet/utils'
import { getGradientShade } from '@zooniverse/react-components'
import { css } from 'styled-components'

const theme = {
  button: {
    extend: props => {
      const { theme: { global: { colors } }, completeness } = props
      const percentComplete = `${completeness}%`
      const progressGradient = [
        `${colors['accent-2']} ${percentComplete}`,
        `transparent ${percentComplete}`
      ].join(',')

      return css`
        position: relative;

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
