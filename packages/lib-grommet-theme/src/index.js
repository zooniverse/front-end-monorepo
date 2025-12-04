import deepFreeze from 'deep-freeze'
// Base Grommet Theme: https://github.com/grommet/grommet/blob/master/src/js/themes/base.js

// Zooniverse brand: https://www.figma.com/proto/HUWCyrjkwgPsGKLXhLGb21/Design-System
const brand = '#00979d'

// dark colors
const darkBlack = '#2D2D2D'
const lightBlack = '#272727'
const darkestGrey = '#333333'
const darkerGrey = '#404040'
const darkGrey = '#5C5C5C'
const lightDarkGrey = '#666666'

// light colors
const lightestGrey = '#eff2f5'
const lighterGrey = '#ebebeb'
const lightGrey = '#e2e5e9'
const grey = '#CBCCCB'
const midGrey = '#a6a7a9'
const moreMiddleGrey = '#979797'

// status
const tomato = '#E45950'
const pink = '#FFB6AA'
const darkGold = '#CC9200'
const green = '#1ED359'

// accent colors
const lightTeal = '#addde0'
const lightGold = '#f6d885'
const mint = '#B8E986'

// neutral colors
const darkTeal = '#005D69'
const gold = '#f0b200'
const blue = '#43BBFD'
const white = '#ffffff'
const black = '#000000'

const accentColors = [
  lightTeal, // accent-1
  lightGold, // accent-2
  mint, // accent-3
  pink, // accent-4
]

const neutralColors = [
  darkTeal, // neutral-1
  gold, // neutral-2
  green, // neutral-3
  tomato, // neutral-4
  blue, // neutral-5
  white, // neutral-6
  black // neutral-7
]

const statusColors = {
  critical: tomato,
  error: pink,
  warning: darkGold,
  ok: green,
  unknown: grey,
  disabled: grey
}

const darkColors = [
  darkBlack, // dark-1
  lightBlack, // dark-2
  darkestGrey, // dark-3
  darkerGrey, // dark-4
  darkGrey, // dark-5
  lightDarkGrey // dark-6
]

const lightColors = [
  lightestGrey, // light-1
  lighterGrey, // light-2
  lightGrey, // light-3
  grey, // light-4
  midGrey, // light-5
  moreMiddleGrey // light-6
]

const drawingTools = {
  red: '#FF3C25', // drawing-red
  orange: '#FF9300', // drawing-orange
  yellow: '#FFFF03', // drawing-yellow
  green: '#06FE76', // drawing-green
  aqua: '#0CFFE0', // drawing-aqua
  blue: '#235DFF', // drawing-blue
  pink: '#FF40FF', // drawing-pink
  ruby: '#FF2B70' // drawing-ruby
}

const highlighterTool = {
  red: '#E65252', // highligher-red
  orange: '#F1AE4D', // highlighter-orange
  yellow: '#FCED54', // highlighter-yellow
  pink: '#EE7BCF', // highlighter-pink
  honeysuckle: '#C7F55B', // highlighter-honeysuckle
  green: '#52DB72', // highlighter-green
  turquoise: '#65EECA', // highlighter-turquoise
  sky: '#7CDFF2', // highlighter-sky
  blue: '#8AA0D3', // highlighter-blue
  purple: '#C17DDF', // highlighter-purple
  plum: '#E7BBE3' // highlighter-plum
}

const colors = {
  brand,
  border: {
    dark: 'dark-1',
    light: 'light-2'
  },
  drawingTools,
  focus: 'accent-1',
  highlighterTool,
  icon: {
    dark: 'light-6',
    light: 'dark-6',
  },
  placeholder: 'dark-5',
  statusColors,
  text: {
    dark: lightGrey,
    light: darkGrey
  }
}

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color
  })

colorArray(accentColors, 'accent')
colorArray(darkColors, 'dark')
colorArray(lightColors, 'light')
colorArray(neutralColors, 'neutral')
Object.keys(drawingTools).forEach((color) => {
  colors[`drawing-${color}`] = drawingTools[color]
})
Object.keys(highlighterTool).forEach((color) => {
  colors[`highlighter-${color}`] = highlighterTool[color]
})
Object.keys(statusColors).forEach((color) => {
  colors[`status-${color}`] = statusColors[color]
})

const theme = deepFreeze({
  global: {
    // The default Grommet breakpoints are in use; see ResponsiveContext component
    breakpoints: {
      small: {
        edgeSize: {
          small: `15px`,
          medium: `20px`,
          large: `25px`,
          xlarge: `30px`,

          'small-neg': `-15px`,
          'medium-neg': `-20px`,
          'large-neg': `-25px`,
          'xlarge-neg': `-30px`
        },
        // value: 768, (viewports <= 768px)
      },
      // medium: {
      //   value: 1536, (768px < viewports <= 1536px)
      // },
      // large: {} (viewports > 1536px)
    },
    colors,
    control: {
      border: {
        color: 'light-5',
        radius: '0px'
      }
    },
    drop: {
      background: {
        dark: 'dark-1',
        light: 'light-1'
      }
    },
    edgeSize: {
      xxsmall: '5px',
      xsmall: `10px`,
      small: `20px`,
      medium: `30px`,
      large: `50px`,
      xlarge: `90px`,

      'xxsmall-neg': '-5px',
      'xsmall-neg': `-10px`,
      'small-neg': `-20px`,
      'medium-neg': `-30px`,
      'large-neg': `-50px`,
      'xlarge-neg': `-90px`
    },
    elevation: {
      light: {
        none: 'none',
        xsmall: '0px 1px 2px rgba(0, 0, 0, 0.30)',
        small: '0px 2px 4px rgba(0, 0, 0, 0.30)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.30)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.30)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.30)'
      },
      dark: {
        none: 'none',
        xsmall: '0px 1px 2px rgba(0, 0, 0, 0.30)',
        small: '0px 2px 4px rgba(0, 0, 0, 0.30)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.30)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.30)',
        xlarge: '0px 12px 24px rgba(0, 0, 0, 0.30)'
      }
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
    },
    input: {
      weight: 'inherit'
    },
  },
  anchor: {
    color: {
      dark: 'accent-1',
      light: 'neutral-1'
    }
  },
  button: {
    border: {
      color: 'brand',
      radius: '0px'
    },
    padding: {
      // Accounting for the border width. Grommet's default border width is 2px
      horizontal: props => `${parseInt(props.theme.global.edgeSize.small) - 2}px`,
      vertical: props => `${parseInt(props.theme.global.edgeSize.xsmall) - 1}px`
    },
    primary: {
      color: 'brand'
    }
  },
  checkBox: {
    border: {
      color: {
        dark: 'light-3',
        light: 'dark-5'
      }
    },
    check: {
      color: {
        dark: 'accent-1',
        light: 'brand'
      }
    },
    color: {
      dark: 'accent-1',
      light: 'brand'
    },
    gap: '10px',
    hover: {
      border: {
        color: {
          dark: 'accent-1',
          light: 'brand'
        }
      }
    },
    knob: {
      color: {
        dark: 'accent-1',
        light: 'brand'
      }
    },
    size: '15px',
    toggle: {
      border: {
        color: {
          dark: 'light-3',
          light: 'dark-5'
        }
      },
      color: {
        dark: 'light-3',
        light: 'dark-5'
      },
      size: '30px'
    }
  },
  heading: { // medium is the default
    // font: {},
    level: {
      1: {
        // "font": {},
        small: {
          size: '32px',
          height: '32px',
          maxWidth: '816px'
        },
        medium: {
          size: '32px',
          height: '37px',
          maxWidth: '1200px'
        },
        large: {
          size: '82px',
          height: '88px',
          maxWidth: '1968px'
        },
        xlarge: {
          size: '114px',
          height: '120px',
          maxWidth: '2736px'
        }
      },
      2: {
        // font: {},
        small: {
          size: '26px',
          height: '26px',
          maxWidth: '624px'
        },
        medium: {
          size: '30px',
          height: '36px',
          maxWidth: '816px'
        },
        large: {
          size: '50px',
          height: '56px',
          maxWidth: '1200px'
        },
        xlarge: {
          size: '66px',
          height: '72px',
          maxWidth: '1584px'
        }
      },
      3: {
        // font: {},
        small: {
          size: '22px',
          height: '22px',
          maxWidth: '528px'
        },
        medium: {
          size: '26px',
          height: '31px',
          maxWidth: '624px'
        },
        large: {
          size: '34px',
          height: '40px',
          maxWidth: '816px'
        },
        xlarge: {
          size: '42px',
          height: '48px',
          maxWidth: '1008px'
        }
      },
      4: { // Same font size as h3, but should be regular not bold.
        font: {
          weight: 'normal'
        },
        small: {
          size: '18px',
          height: '18px',
          maxWidth: '432px'
        },
        medium: {
          size: '26px',
          height: '31px',
          maxWidth: '432px'
        },
        large: {
          size: '18px',
          height: '24px',
          maxWidth: '432px'
        },
        xlarge: {
          size: '18px',
          height: '24px',
          maxWidth: '432px'
        }
      },
      5: {
        // font: {}
        small: {
          size: '14px',
          height: '14px',
          maxWidth: '384px'
        },
        medium: {
          size: '14px',
          height: '17px',
          maxWidth: '384px'
        },
        large: {
          size: '14px',
          height: '17px',
          maxWidth: '384px'
        },
        xlarge: {
          size: '14px',
          height: '17px',
          maxWidth: '384px'
        }
      },
      6: {
        // font: {},
        small: {
          size: '14px',
          height: '14px',
          maxWidth: '336px'
        },
        medium: {
          size: '14px',
          height: '17px',
          maxWidth: '336px'
        },
        large: {
          size: '14px',
          height: '17px',
          maxWidth: '336px'
        },
        xlarge: {
          size: '14px',
          height: '17px',
          maxWidth: '336px'
        }
      }
    },
    responsiveBreakpoint: 'small',
    weight: 600,
    extend: props => `margin: ${props.margin || '10px 0 10px 0'}`
  },
  layer: {
    background: {
      dark: 'dark-1',
      light: 'light-1'
    },
    border: {
      radius: '0px'
    }
  },
  paragraph: {
    small: {
      size: '14px',
      height: '1.5',
      maxWidth: '100%'
    },
    medium: {
      size: '16px',
      height: '1.5',
      maxWidth: '100%'
    },
    large: {
      size: '18px',
      height: '1.3',
      maxWidth: '100%'
    },
    xlarge: {
      size: '22px',
      height: '1.2',
      maxWidth: '100%'
    },
    xxlarge: {
      size: '26px',
      height: '1.2',
      maxWidth: '100%'
    },
    extend: props => `margin: ${props.margin || '1em 0 1em 0'}`
  },
  radioButton: {
    check: {
      color: {
        dark: 'accent-1',
        light: 'brand'
      }
    },
    color: {
      dark: 'accent-1',
      light: 'brand'
    },
    icon: {
      size: '15px',
      extend: `
        circle {
          r: 10px;
        }
      `
    },
    size: '15px'
  },
  select: {
    icons: {
      color: {
        dark: 'accent-1',
        light: 'brand'
      }
    }
  },
  text: {
    xsmall: {
      size: '12px',
      height: '17px',
      maxWidth: '100%'
    },
    small: {
      size: '14px',
      height: '19px',
      maxWidth: '100%'
    },
    medium: {
      size: '14px',
      height: '19px',
      maxWidth: '100%'
    },
    large: {
      size: '22px',
      height: '27px',
      maxWidth: '100%'
    },
    xlarge: {
      size: '26px',
      height: '31px',
      maxWidth: '100%'
    },
    xxlarge: {
      size: '34px',
      height: '39px',
      maxWidth: '100%'
    }
  }
})

export default theme
