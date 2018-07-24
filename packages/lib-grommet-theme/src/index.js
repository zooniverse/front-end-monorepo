import deepFreeze from 'deep-freeze'
import light from './light'
import dark from './dark'

const theme = deepFreeze({
  dark,
  global: {
    colors: {
      brand: '#007482',
      lightBrand: '#16979C',
      black: '#000',
      lightBlack: '#272727',
      darkGrey: '#5c5c5c',
      teal: '#00979d',
      lightTeal: '#addde0',
      darkGold: '#CC9200',
      gold: '#f0b200',
      lightGold: '#f6d885',
      tomato: '#e45950',
      grey: '#CBCCCB',
      lightGrey: '#e2e5e9',
      lighterGrey: '#eff2f5',
      midGrey: '#a6a7a9',
      darkGrey: '#646464',
      green: '#078f52',
      darkTeal: '#005D69',
      text: '#444444',
      navy: '#0C4881',
      lightNavy: '#6D91B3'
    },
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
  light
})

export default theme
