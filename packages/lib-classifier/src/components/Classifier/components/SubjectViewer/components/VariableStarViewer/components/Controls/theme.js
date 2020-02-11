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
    icon: {
      size: '5px'
    }
  }
}

export default theme