import { css } from 'styled-components'

const theme = {
  checkBox: {
    icon: {
      size: '20px'
    },
    size: '14px'
  },
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
    border: {
      color: {
        light: 'light-6',
        dark: 'light-3'
      }
    },
    extend: () => css`
      position: relative;

      input:not(:checked) + div {
        height: 5px;
        margin-bottom: 5px;
        position: relative;
        top: 2.5px;
        width: 5px;
      }
    `,
    hover: {
      border: {
        color: {
          dark: 'accent-1',
          light: 'neutral-1'
        }
      }
    },
    gap: '0px',
    size: '10px',
    icon: {
      size: '6px'
    }
  }
}

export default theme