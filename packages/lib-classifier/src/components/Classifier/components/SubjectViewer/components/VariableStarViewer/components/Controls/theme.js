import { css } from 'styled-components'

const theme = {
  checkBox: {
    border: {
      color: {
        light: 'light-6',
        dark: 'light-6' // this will change when dark theme styles is added
      }
    },
    hover: {
      border: {
        color: {
          dark: 'accent-4',
          light: 'neutral-2'
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
        dark:  'light-6' // this will change when dark theme styles is added
      }
    },
    hover: {
      border: {
        color: {
          dark: 'accent-4',
          light: 'neutral-2'
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