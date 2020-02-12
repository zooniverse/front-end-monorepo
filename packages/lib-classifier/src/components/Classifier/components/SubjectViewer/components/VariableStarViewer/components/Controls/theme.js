import { css } from 'styled-components'

const theme = {
  formField: {
    border: 'none',
    extend: () => css`
      flex-direction: column-reverse;
    `,
    label: {
      margin: 'none'
    },
    margin: 'none'
  },
  radioButton: {
    gap: 'xsmall',
    size: '12px',
    icon: {
      size: '6px'
    }
  }
}

export default theme