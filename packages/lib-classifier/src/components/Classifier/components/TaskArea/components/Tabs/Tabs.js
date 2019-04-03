import { Grommet, Tabs as GrommetTabs } from 'grommet'
import { darken, lighten } from 'polished'
import { oneOf, shape, string } from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

function Tabs (props) {
  const { global: { colors }, mode } = props.theme

  const isLight = mode === 'light'
  const borderColor = isLight ? colors['light-3'] : colors['dark-1']
  const activeBackgroundColor = isLight ? colors['white'] : colors['dark-3']
  const hoverBackgroundColor = isLight
    ? {
        bottom: darken(0.11, colors['accent-2']),
        top: lighten(0.05, colors['accent-2'])
      }
    : {
        bottom: darken(0.11, colors['neutral-2']),
        top: darken(0.04, colors['neutral-2'])
      }

  const tabsTheme = Object.assign({}, props.theme, {
    tab: {
      active: {
        background: {
          dark: 'dark-3',
          light: 'white'
        }
      },
      border: {
        active: {
          color: 'transparent'
        },
        color: {
          dark: 'dark-1',
          light: 'light-3',
        },
        hover: {
          color: {
            dark: 'dark-1',
            light: 'light-3',
          }
        },
        size: 'xsmall'
      },
      // We use the border color check here as a proxy for the active tab, as
      // the props don't include the active state prop.
      extend: props => `
        margin: 0;
        padding: 16px 20px;
        ${props.border.color === 'transparent' && (`
          border-left: 1px solid ${borderColor};
          border-right: 1px solid ${borderColor};
          border-top: 1px solid ${borderColor};
        `)}
        ${props.border.color !== 'transparent' && (`
          &:focus,
          &:hover {
            background: linear-gradient(${hoverBackgroundColor.top}, ${hoverBackgroundColor.bottom});
          }
        `)}
      `,
      pad: 'small'
    },
    tabs: {
      extend: `
        button {
          flex: 1 1 ${100 / props.children.length}%;
        }
      `,
      header: {
        background: {
          dark: 'dark-2',
          light: 'light-1'
        },
        extend: `
          text-align: center;
        `
      },
      panel: {
        extend: `
          background: ${activeBackgroundColor};
          border-left: 1px solid ${borderColor};
          border-right: 1px solid ${borderColor};
          border-bottom: 1px solid ${borderColor};
        `
      }
    }
  })

  return (
    <Grommet theme={tabsTheme}>
      <GrommetTabs {...props} />
    </Grommet>
  )
}

Tabs.propTypes = {
  theme: shape({
    mode: oneOf(['light', 'dark']),
    global: shape({
      colors: shape({
        'accent-2': string,
        'accent-2': string,
        'dark-1': string,
        'dark-3': string,
        'light-3': string,
        'neutral-2': string,
        'neutral-2': string,
        'white': string,
      })
    })
  })
}

export default withTheme(Tabs)
