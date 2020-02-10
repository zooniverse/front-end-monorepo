import { css } from 'styled-components'
const theme = {
  anchor: {
    extend: props => css`
      & {
        border-bottom: 2px solid transparent;
        border-top: 2px solid transparent;
        ${props.active && css`
          font-weight: bold;
          color: white;
          border-bottom-color: white;
        `}
      }
    `,
    fontWeight: 'normal',
    hover: {
      extend: css`
        background: rgba(255,255,255,0.2);
        color: white;
      `,
      textDecoration: 'none'
    }
  }
}

export default theme
