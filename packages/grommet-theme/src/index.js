import deepFreeze from 'deep-freeze'
import light from './light'
import dark from './dark'

const lightBlack = '#272727'

const darkGold = '#CC9200'

const green = '#078F52'

const lighterGrey = '#eff2f5'
const lightGrey = '#e2e5e9'
const grey = '#CBCCCB'
const midGrey = '#a6a7a9'
const darkGrey = '#646464'

const tomato = '#E45950'

const statusColors = {
  critical: tomato,
  error: tomato,
  warning: darkGold,
  ok: green,
  unknown: grey,
  disabled: grey
}

const colors = {
  brand: '#007482',
  lightBrand: '#16979C',
  darkBackground: {
    text: dark.colors.font
  },
  darkGrey,
  darkGold,
  darkTeal: '#005D69',
  lightBackground: {
    text: light.colors.font
  },
  lightBlack,
  lightGold: '#f6d885',
  lightGrey,
  lightNavy: '#6D91B3',
  lightTeal: '#addde0',
  lighterGrey,
  gold: '#f0b200',
  green,
  grey,
  midGrey,
  navy: '#0C4881',
  statusColors,
  teal: '#00979d',
  text: light.colors.font,
  tomato
}

Object.keys(statusColors).forEach((color) => {
  colors[`status-${color}`] = statusColors[color]
})

const theme = deepFreeze({
  dark,
  global: {
    colors,
    font: {
      family: "'Karla', Arial, sans-serif",
      face: `
        @font-face {
          font-family: 'Karla';
          font-style: normal;
          font-weight: 400;
          src:
            local('Karla'),
            local('Karla-Regular'),
            url(https://fonts.gstatic.com/s/karla/v6/qkBbXvYC6trAT7RVLtyU5rZP.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Karla';
          font-style: normal;
          font-weight: 700;
          src:
            local('Karla Bold'),
            local('Karla-Bold'),
            url(https://fonts.gstatic.com/s/karla/v6/qkBWXvYC6trAT7zuC8m5xLtlmgzD.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `
    }
  },
  anchor: {
    color: {
      dark: colors.lightTeal,
      light: colors.brand
    }
  },
  checkBox: {
    border: {
      color: {
        dark: '#2D2D2D',
        light: colors.lightBlack
      }
    },
    check: {
      color: {
        dark: colors.lightTeal,
        light: colors.brand
      }
    },
    hover: {
      border: {
        color: {
          dark: colors.darkBackground.text,
          light: colors.text
        },
      },
    },
    toggle: {
      color: {
        dark: colors.lightTeal,
        light: colors.brand
      }
    }
  },
  light
})

export default theme
