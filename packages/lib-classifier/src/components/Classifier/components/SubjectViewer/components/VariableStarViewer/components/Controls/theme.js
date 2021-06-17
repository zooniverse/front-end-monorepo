import { css } from 'styled-components'

const theme = {
  checkBox: {
    border: {
      color: {
        light: 'light-6',
        dark: 'light-3'
      }
    },
    hover: {
      border: {
        color: {
          dark: 'accent-1',
          light: 'neutral-1'
        }
      }
    },
    gap: '0px',
    icon: {
      size: '20px'
    },
    size: '14px'
  },
  radioButton: {
    border: {
      color: {
        light: 'light-6',
        dark:  'light-3'
      }
    },
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
      size: '16px'
    }
  }
}

export default theme