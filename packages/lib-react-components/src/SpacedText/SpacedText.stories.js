import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import readme from './README.md'
import SpacedText from './SpacedText'

export default {
  title: 'Components / SpacedText',
  component: SpacedText,
  args: {
    children: 'Zooniverse Spaced Text',
    dark: false,
    size: 'medium',
    uppercase: true,
    weight: 'normal'
  },
  argTypes: {
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

export const Default = ({ children, dark, size, uppercase, weight }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <SpacedText size={size} uppercase={uppercase} weight={weight}>
      {children}
    </SpacedText>
  </Grommet>
)
