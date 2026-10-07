import { css } from 'styled-components'

const theme = {
  text: {
    extend: props => css`
      text-transform: capitalize;
      html[lang="ar"],
      html[lang="he"] {
        &:after {
          content: ' ←';
        }
      }
      &:after {
        content: ' →';
      }
    `
  }
}

export default theme
