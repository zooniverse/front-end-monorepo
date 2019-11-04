import { adjustHue } from 'polished'

const theme = {
  button: {
    extend: props => {
      const { theme: { dark, global: { colors } } } = props

      return `
        text-align: center;
        &:disabled {
          cursor: not-allowed;
        }
    `}
  }
}

export default theme
