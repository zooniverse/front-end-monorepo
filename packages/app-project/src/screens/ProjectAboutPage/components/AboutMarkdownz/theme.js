import { css } from 'styled-components'

const theme = {
  heading: {
    extend: props => css`
      color: ${props.theme.global.colors['neutral-2']};
      margin: 14px 0;
    `,
    level: {
      4: {
        medium: { // medium is the default
          size: '16px'
        },
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
      line-height: 1.5;
      margin: 0 0 14px 0;
    `
  }
}

export default theme
