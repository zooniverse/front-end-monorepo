import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'

import readme from './README.md'
import SpacedHeading from './SpacedHeading'

export default {
  title: 'Components / SpacedHeading',
  component: SpacedHeading,
  args: {
    children: 'Zooniverse Spaced Heading',
    color: undefined,
    dark: false,
    level: 2,
    size: 'medium',
    weight: 'bold'
  },
  argTypes: {
    level: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: 'select' }
    },
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'select' }
    },
    weight: {
      options: ['normal', 'bold'],
      control: { type: 'radio' }
    }
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default({ children, color, dark, level, size, weight }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='medium'>
        <SpacedHeading color={color} level={level} size={size} weight={weight}>
          {children}
        </SpacedHeading>
      </Box>
    </Grommet>
  )
}
