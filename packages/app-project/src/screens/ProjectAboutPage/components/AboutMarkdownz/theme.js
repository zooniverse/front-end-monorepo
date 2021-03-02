import { css } from 'styled-components'

const theme = {
  heading: {
    extend: props => css`
      color: ${props.theme.global.colors['neutral-2']};
      margin: 14px 0;
    `,
    level: {
      4: {
        font: {
          weight: 'bold'
        }
      },
      6: {
        medium: {
          size: '12px'
        }
      }
    }
  },
  paragraph: {
    extend: props => css`
      color: ${props.theme.global.colors.black};
    `
  }
}

export default theme
