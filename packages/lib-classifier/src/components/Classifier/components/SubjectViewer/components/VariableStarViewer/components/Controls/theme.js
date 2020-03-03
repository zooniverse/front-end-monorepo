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
    border: {
      color: {
        light: 'light-6',
        dark:  'light-6' // this will change when dark theme styles is added
      }
    },
    extend: () => css`
      flex-direction: column;
      position: relative;
      z-index: 100;

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
          dark: 'brand',
          light: 'brand'
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